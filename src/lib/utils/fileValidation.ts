/**
 * File validation utilities for avatar uploads
 * Provides client-side validation before server upload
 */

// File signatures (magic bytes) for image formats
const IMAGE_SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
  ],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
};

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MIN_DIMENSION = 32;
const MAX_DIMENSION = 2048;

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  width?: number;
  height?: number;
}

/**
 * Validates file extension
 */
export function validateFileExtension(fileName: string): boolean {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return ALLOWED_EXTENSIONS.includes(extension);
}

/**
 * Validates file size
 */
export function validateFileSize(size: number): boolean {
  return size > 0 && size <= MAX_FILE_SIZE;
}

/**
 * Validates MIME type
 */
export function validateMimeType(mimeType: string): boolean {
  return ALLOWED_MIME_TYPES.includes(mimeType);
}

/**
 * Validates file signature (magic bytes)
 */
export async function validateFileSignature(file: File, expectedMime: string): Promise<boolean> {
  const signatures = IMAGE_SIGNATURES[expectedMime];
  if (!signatures) return false;

  try {
    // Read first 12 bytes for signature check
    const buffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    return signatures.some(sig => {
      // Check if buffer is long enough
      if (bytes.length < sig.length) return false;
      
      // Check each byte
      const matches = sig.every((byte, index) => bytes[index] === byte);
      
      // For WebP, also check for "WEBP" string at offset 8
      if (expectedMime === 'image/webp' && matches && bytes.length >= 12) {
        const webpString = String.fromCharCode(...bytes.slice(8, 12));
        return webpString === 'WEBP';
      }
      
      return matches;
    });
  } catch {
    return false;
  }
}

/**
 * Detects MIME type from file signature
 */
export async function detectMimeTypeFromFile(file: File): Promise<string | null> {
  try {
    const buffer = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    for (const [mimeType, signatures] of Object.entries(IMAGE_SIGNATURES)) {
      for (const sig of signatures) {
        if (bytes.length < sig.length) continue;
        
        const matches = sig.every((byte, index) => bytes[index] === byte);
        
        if (matches) {
          // Additional check for WebP
          if (mimeType === 'image/webp' && bytes.length >= 12) {
            const webpString = String.fromCharCode(...bytes.slice(8, 12));
            if (webpString === 'WEBP') return mimeType;
          } else if (mimeType !== 'image/webp') {
            return mimeType;
          }
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Validates image using Canvas API (ensures file is actually decodable as image)
 */
export function validateImageWithCanvas(file: File): Promise<FileValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      // Validate dimensions
      if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
        resolve({ 
          valid: false, 
          error: `Image too small (minimum ${MIN_DIMENSION}x${MIN_DIMENSION}px)` 
        });
        return;
      }
      
      if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
        resolve({ 
          valid: false, 
          error: `Image too large (maximum ${MAX_DIMENSION}x${MAX_DIMENSION}px)` 
        });
        return;
      }
      
      resolve({ 
        valid: true, 
        width: img.width, 
        height: img.height 
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ 
        valid: false, 
        error: 'Invalid image file - cannot be decoded' 
      });
    };
    
    img.src = url;
  });
}

/**
 * Comprehensive file validation (all checks)
 */
export async function validateAvatarFile(file: File): Promise<FileValidationResult> {
  // 1. Check file extension
  if (!validateFileExtension(file.name)) {
    return {
      valid: false,
      error: `Invalid file extension. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
    };
  }

  // 2. Check file size
  if (!validateFileSize(file.size)) {
    if (file.size === 0) {
      return { valid: false, error: 'File is empty' };
    }
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  // 3. Check MIME type
  if (!validateMimeType(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
    };
  }

  // 4. Check file signature (magic bytes)
  const signatureValid = await validateFileSignature(file, file.type);
  if (!signatureValid) {
    return {
      valid: false,
      error: 'File signature does not match declared type. File may be corrupted or disguised.',
    };
  }

  // 5. Detect actual MIME type and compare with declared
  const detectedMime = await detectMimeTypeFromFile(file);
  if (detectedMime && detectedMime !== file.type) {
    return {
      valid: false,
      error: 'File type mismatch. Declared type does not match file content.',
    };
  }

  // 6. Validate with Canvas (ensures file is actually decodable)
  const canvasValidation = await validateImageWithCanvas(file);
  if (!canvasValidation.valid) {
    return canvasValidation;
  }

  return {
    valid: true,
    width: canvasValidation.width,
    height: canvasValidation.height,
  };
}

