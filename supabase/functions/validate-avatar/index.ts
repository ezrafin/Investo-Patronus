import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidateAvatarResponse {
  valid: boolean;
  error?: string;
  mimeType?: string;
  width?: number;
  height?: number;
}

// File signatures (magic bytes) for image formats
const IMAGE_SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
  ],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header (needs additional WEBP check)
};

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MIN_DIMENSION = 32;
const MAX_DIMENSION = 2048;

function validateFileSignature(buffer: Uint8Array, expectedMime: string): boolean {
  const signatures = IMAGE_SIGNATURES[expectedMime];
  if (!signatures) return false;

  return signatures.some(sig => {
    // Check if buffer is long enough
    if (buffer.length < sig.length) return false;
    
    // Check each byte
    const matches = sig.every((byte, index) => buffer[index] === byte);
    
    // For WebP, also check for "WEBP" string at offset 8
    if (expectedMime === 'image/webp' && matches && buffer.length >= 12) {
      const webpString = String.fromCharCode(...buffer.slice(8, 12));
      return webpString === 'WEBP';
    }
    
    return matches;
  });
}

function detectMimeTypeFromSignature(buffer: Uint8Array): string | null {
  for (const [mimeType, signatures] of Object.entries(IMAGE_SIGNATURES)) {
    for (const sig of signatures) {
      if (buffer.length < sig.length) continue;
      
      const matches = sig.every((byte, index) => buffer[index] === byte);
      
      if (matches) {
        // Additional check for WebP
        if (mimeType === 'image/webp' && buffer.length >= 12) {
          const webpString = String.fromCharCode(...buffer.slice(8, 12));
          if (webpString === 'WEBP') return mimeType;
        } else if (mimeType !== 'image/webp') {
          return mimeType;
        }
      }
    }
  }
  return null;
}

function validateFileName(fileName: string): boolean {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return ALLOWED_EXTENSIONS.includes(extension);
}

async function validateImageDimensions(buffer: ArrayBuffer): Promise<{ width: number; height: number } | null> {
  try {
    // For PNG, we can read dimensions from the header
    const bytes = new Uint8Array(buffer);
    
    // PNG: dimensions are at bytes 16-23 (width: 16-19, height: 20-23)
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
      const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
      const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
      return { width, height };
    }
    
    // For JPEG, dimensions require parsing JFIF structure (more complex)
    // For GIF, dimensions are at bytes 6-9 (width: 6-7, height: 8-9)
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
      const width = (bytes[7] << 8) | bytes[6];
      const height = (bytes[9] << 8) | bytes[8];
      return { width, height };
    }
    
    // For WebP, dimensions are in VP8/VP8L header (more complex)
    // For now, we'll skip dimension validation for JPEG and WebP
    // and rely on client-side Canvas validation
    
    return null;
  } catch {
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ valid: false, error: 'Method not allowed' } as ValidateAvatarResponse),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Get auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Unauthorized' } as ValidateAvatarResponse),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Unauthorized' } as ValidateAvatarResponse),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get file from form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ valid: false, error: 'No file provided' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Validate file name and extension
    if (!validateFileName(file.name)) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid file extension' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ valid: false, error: 'File too large (max 2MB)' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (file.size === 0) {
      return new Response(
        JSON.stringify({ valid: false, error: 'File is empty' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid file type' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Read file buffer and validate magic bytes
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Detect actual MIME type from file signature
    const detectedMimeType = detectMimeTypeFromSignature(bytes);
    
    if (!detectedMimeType) {
      return new Response(
        JSON.stringify({ valid: false, error: 'File signature does not match image format' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Verify detected MIME matches declared MIME
    if (detectedMimeType !== file.type) {
      return new Response(
        JSON.stringify({ valid: false, error: 'File type mismatch (declared type does not match file content)' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 6. Validate file signature matches expected type
    if (!validateFileSignature(bytes, file.type)) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid file signature' } as ValidateAvatarResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 7. Try to validate dimensions (for PNG and GIF)
    const dimensions = await validateImageDimensions(buffer);
    if (dimensions) {
      if (dimensions.width < MIN_DIMENSION || dimensions.height < MIN_DIMENSION) {
        return new Response(
          JSON.stringify({ valid: false, error: `Image too small (min ${MIN_DIMENSION}x${MIN_DIMENSION})` } as ValidateAvatarResponse),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (dimensions.width > MAX_DIMENSION || dimensions.height > MAX_DIMENSION) {
        return new Response(
          JSON.stringify({ valid: false, error: `Image too large (max ${MAX_DIMENSION}x${MAX_DIMENSION})` } as ValidateAvatarResponse),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          valid: true, 
          mimeType: file.type,
          width: dimensions.width,
          height: dimensions.height
        } as ValidateAvatarResponse),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If we can't read dimensions from header, still validate signature
    return new Response(
      JSON.stringify({ 
        valid: true, 
        mimeType: file.type
      } as ValidateAvatarResponse),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Avatar validation error:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' } as ValidateAvatarResponse),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

