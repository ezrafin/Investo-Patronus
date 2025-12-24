import { ALL_PROFANITY, OFFENSIVE_PHRASES } from './wordLists';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Normalize text for profanity detection
 * Handles obfuscation: f*ck, f@ck, f_u_c_k, f00k, etc.
 */
function normalizeText(text: string): string {
  // Remove markdown formatting first
  let normalized = text
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/`[^`]+`/g, '') // Inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/~~([^~]+)~~/g, '$1') // Strikethrough
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Links
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/^>\s+/gm, '') // Blockquotes
    .replace(/^[-*+]\s+/gm, '') // List items
    .replace(/^\d+\.\s+/gm, ''); // Numbered lists

  // Remove special characters but keep spaces
  normalized = normalized
    .replace(/[^\w\s]/g, '') // Remove special chars
    .toLowerCase()
    .trim();

  // Remove extra spaces
  normalized = normalized.replace(/\s+/g, ' ');

  return normalized;
}

/**
 * Extract words from normalized text
 */
function extractWords(text: string): string[] {
  // Split by spaces and filter empty
  return text.split(/\s+/).filter(word => word.length > 0);
}

/**
 * Check for profanity in text
 */
function checkProfanity(text: string): boolean {
  const normalized = normalizeText(text);
  const words = extractWords(normalized);

  // Check individual words
  for (const word of words) {
    // Remove spaces from word for matching (handles "f u c k")
    const wordWithoutSpaces = word.replace(/\s/g, '');
    if (ALL_PROFANITY.has(wordWithoutSpaces)) {
      return true;
    }

    // Check if word contains profanity (handles partial matches)
    for (const profanity of ALL_PROFANITY) {
      if (wordWithoutSpaces.includes(profanity) && profanity.length >= 4) {
        return true;
      }
    }
  }

  // Check for offensive phrases
  const lowerText = normalized.toLowerCase();
  for (const phrase of OFFENSIVE_PHRASES) {
    if (lowerText.includes(phrase)) {
      return true;
    }
  }

  return false;
}

/**
 * Phone number detection patterns
 * Detects various phone number formats while avoiding false positives
 */
const PHONE_PATTERNS = [
  // US formats: (XXX) XXX-XXXX, XXX-XXX-XXXX, XXX.XXX.XXXX, +1-XXX-XXX-XXXX
  /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  
  // International: +XX XXXX XXXX, +XX-XXXX-XXXX
  /\+\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/g,
  
  // European: 0X XX XX XX XX, 0X-XX-XX-XX-XX
  /\b0\d[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}\b/g,
  
  // Generic: 7+ consecutive digits (but not in code blocks or URLs)
  /\b\d{7,}\b/g,
];

/**
 * Check if text contains phone numbers
 * Excludes common false positives like years, prices, IDs
 */
function checkPhoneNumbers(text: string): boolean {
  // Remove code blocks and URLs first to avoid false positives
  const withoutCode = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/https?:\/\/[^\s]+/g, '');

  // Check each pattern
  for (const pattern of PHONE_PATTERNS) {
    const matches = withoutCode.match(pattern);
    if (matches) {
      // Filter out false positives
      for (const match of matches) {
        const digitsOnly = match.replace(/\D/g, '');
        
        // Skip if it's a year (1900-2099)
        if (/^(19|20)\d{2}$/.test(digitsOnly)) {
          continue;
        }
        
        // Skip if it's a common price format (ends with .00, .99, etc.)
        if (/^\d+\.(00|99|50)$/.test(match)) {
          continue;
        }
        
        // Skip if it's a stock ticker or short ID (less than 7 digits)
        if (digitsOnly.length < 7) {
          continue;
        }
        
        // Skip if it's part of a URL or email
        const contextStart = Math.max(0, text.indexOf(match) - 5);
        const contextEnd = text.indexOf(match) + match.length + 5;
        const context = text.substring(contextStart, contextEnd);
        if (/[@\/]/.test(context)) {
          continue;
        }
        
        // This looks like a phone number
        return true;
      }
    }
  }

  return false;
}

/**
 * Validate forum reply content
 * Checks for profanity, offensive language, and phone numbers
 */
export function validateReplyContent(content: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!content || content.trim().length === 0) {
    return {
      isValid: false,
      errors: ['Content cannot be empty'],
    };
  }

  // Check for profanity and offensive language
  if (checkProfanity(content)) {
    errors.push('profanity');
  }

  // Check for phone numbers
  if (checkPhoneNumbers(content)) {
    errors.push('phoneNumber');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Get user-friendly error message key for validation error
 */
export function getValidationErrorMessageKey(error: string): string {
  switch (error) {
    case 'profanity':
      return 'validation.profanity';
    case 'phoneNumber':
      return 'validation.phoneNumber';
    default:
      return 'validation.generic';
  }
}

