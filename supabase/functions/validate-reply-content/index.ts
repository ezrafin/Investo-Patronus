import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ValidateRequest {
  content: string;
  userId?: string;
}

interface ValidateResponse {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

// Word lists (server-side, more comprehensive)
const ENGLISH_PROFANITY = new Set([
  'fuck', 'shit', 'damn', 'hell', 'ass', 'bitch', 'bastard',
  'crap', 'piss', 'dick', 'cock', 'pussy', 'cunt', 'whore',
  'slut', 'fag', 'faggot', 'nigger', 'nigga', 'retard',
  'idiot', 'moron', 'stupid', 'dumb', 'loser', 'freak',
  'kill', 'die', 'death', 'murder', 'suicide',
]);

const RUSSIAN_PROFANITY = new Set([
  'blyat', 'blyad', 'suka', 'pizda', 'ebat', 'ebal', 'hui',
  'huy', 'pizdec', 'zhopa', 'mudak', 'gandon', 'pidor',
  'pidoras', 'mraz', 'svoloch', 'ublyudok', 'sukin',
  'ubit', 'ubey', 'smert', 'smertey',
]);

const SPANISH_PROFANITY = new Set([
  'joder', 'puta', 'puto', 'coño', 'cabron', 'cabrón',
  'maricon', 'maricón', 'hijo', 'hija', 'mierda', 'carajo',
  'chingar', 'chinga', 'pinche', 'culero', 'pendejo',
  'matar', 'muerte', 'morir',
]);

const ALL_PROFANITY = new Set([
  ...ENGLISH_PROFANITY,
  ...RUSSIAN_PROFANITY,
  ...SPANISH_PROFANITY,
]);

const OFFENSIVE_PHRASES = [
  'go to hell',
  'fuck off',
  'fuck you',
  'kill yourself',
  'die already',
  'you suck',
  'you\'re stupid',
  'you\'re dumb',
  'you\'re an idiot',
  'idi nakhuy',
  'idi na huy',
  'poshel nakhuy',
  'vete a la mierda',
  'que te jodan',
];

// Phone number patterns
const PHONE_PATTERNS = [
  /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  /\+\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/g,
  /\b0\d[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}\b/g,
  /\b\d{7,}\b/g,
];

/**
 * Normalize text for profanity detection
 */
function normalizeText(text: string): string {
  let normalized = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '');

  normalized = normalized
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .trim();

  normalized = normalized.replace(/\s+/g, ' ');

  return normalized;
}

/**
 * Extract words from normalized text
 */
function extractWords(text: string): string[] {
  return text.split(/\s+/).filter(word => word.length > 0);
}

/**
 * Check for profanity in text
 */
function checkProfanity(text: string): boolean {
  const normalized = normalizeText(text);
  const words = extractWords(normalized);

  for (const word of words) {
    const wordWithoutSpaces = word.replace(/\s/g, '');
    if (ALL_PROFANITY.has(wordWithoutSpaces)) {
      return true;
    }

    for (const profanity of ALL_PROFANITY) {
      if (wordWithoutSpaces.includes(profanity) && profanity.length >= 4) {
        return true;
      }
    }
  }

  const lowerText = normalized.toLowerCase();
  for (const phrase of OFFENSIVE_PHRASES) {
    if (lowerText.includes(phrase)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if text contains phone numbers
 */
function checkPhoneNumbers(text: string): boolean {
  const withoutCode = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/https?:\/\/[^\s]+/g, '');

  for (const pattern of PHONE_PATTERNS) {
    const matches = withoutCode.match(pattern);
    if (matches) {
      for (const match of matches) {
        const digitsOnly = match.replace(/\D/g, '');
        
        if (/^(19|20)\d{2}$/.test(digitsOnly)) {
          continue;
        }
        
        if (/^\d+\.(00|99|50)$/.test(match)) {
          continue;
        }
        
        if (digitsOnly.length < 7) {
          continue;
        }
        
        if (/[@\/]/.test(text.substring(Math.max(0, text.indexOf(match) - 5), text.indexOf(match) + match.length + 5))) {
          continue;
        }
        
        return true;
      }
    }
  }

  return false;
}

/**
 * Validate reply content
 */
function validateReplyContent(content: string): ValidateResponse {
  const errors: string[] = [];

  if (!content || content.trim().length === 0) {
    return {
      isValid: false,
      errors: ['Content cannot be empty'],
    };
  }

  if (checkProfanity(content)) {
    errors.push('profanity');
  }

  if (checkPhoneNumbers(content)) {
    errors.push('phoneNumber');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ isValid: false, errors: ['Unauthorized'] } as ValidateResponse),
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
        JSON.stringify({ isValid: false, errors: ['Unauthorized'] } as ValidateResponse),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { content } = await req.json() as ValidateRequest;

    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ isValid: false, errors: ['Content is required'] } as ValidateResponse),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validation = validateReplyContent(content);

    // Log validation failures for moderation (without storing full content)
    if (!validation.isValid) {
      console.log(`Validation failed for user ${user.id}: ${validation.errors.join(', ')}`);
    }

    return new Response(
      JSON.stringify(validation),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Validation error:', error);
    return new Response(
      JSON.stringify({ isValid: false, errors: ['Internal server error'] } as ValidateResponse),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

