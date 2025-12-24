/**
 * Multilingual profanity and offensive word lists
 * These lists are used for content validation in forum replies
 */

// English profanity and offensive words
export const ENGLISH_PROFANITY = new Set([
  // Common swear words (censored for documentation)
  'fuck', 'shit', 'damn', 'hell', 'ass', 'bitch', 'bastard',
  'crap', 'piss', 'dick', 'cock', 'pussy', 'cunt', 'whore',
  'slut', 'fag', 'faggot', 'nigger', 'nigga', 'retard',
  'idiot', 'moron', 'stupid', 'dumb', 'loser', 'freak',
  // Offensive terms
  'kill', 'die', 'death', 'murder', 'suicide',
]);

// Russian profanity and offensive words
export const RUSSIAN_PROFANITY = new Set([
  // Common Russian swear words (transliterated)
  'blyat', 'blyad', 'suka', 'pizda', 'ebat', 'ebal', 'hui',
  'huy', 'pizdec', 'zhopa', 'mudak', 'gandon', 'pidor',
  'pidoras', 'mraz', 'svoloch', 'ublyudok', 'sukin',
  // Offensive terms
  'ubit', 'ubey', 'smert', 'smertey',
]);

// Spanish profanity and offensive words
export const SPANISH_PROFANITY = new Set([
  // Common Spanish swear words
  'joder', 'puta', 'puto', 'coño', 'cabron', 'cabrón',
  'maricon', 'maricón', 'hijo', 'hija', 'mierda', 'carajo',
  'chingar', 'chinga', 'pinche', 'culero', 'pendejo',
  // Offensive terms
  'matar', 'muerte', 'morir',
]);

// Combined multilingual set for quick lookup
export const ALL_PROFANITY = new Set([
  ...ENGLISH_PROFANITY,
  ...RUSSIAN_PROFANITY,
  ...SPANISH_PROFANITY,
]);

// Offensive phrases (multi-word)
export const OFFENSIVE_PHRASES = [
  'go to hell',
  'fuck off',
  'fuck you',
  'kill yourself',
  'die already',
  'you suck',
  'you\'re stupid',
  'you\'re dumb',
  'you\'re an idiot',
  // Russian phrases
  'idi nakhuy',
  'idi na huy',
  'poshel nakhuy',
  // Spanish phrases
  'vete a la mierda',
  'que te jodan',
];

// Language-specific word lists for targeted detection
export const WORD_LISTS_BY_LANGUAGE = {
  en: ENGLISH_PROFANITY,
  ru: RUSSIAN_PROFANITY,
  es: SPANISH_PROFANITY,
};

/**
 * Get profanity list for a specific language
 */
export function getProfanityList(language: string): Set<string> {
  const lang = language.toLowerCase().slice(0, 2);
  return WORD_LISTS_BY_LANGUAGE[lang as keyof typeof WORD_LISTS_BY_LANGUAGE] || ALL_PROFANITY;
}

