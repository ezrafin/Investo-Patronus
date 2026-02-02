import { getLocaleForLanguage, SupportedLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n';

export function safeParseDate(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function formatNewsDate(
  value: string | null | undefined,
  language: string,
  withTime = true,
): string | null {
  const date = safeParseDate(value);
  if (!date) return null;

  const safeLang: SupportedLanguage = isSupportedLanguage(language) ? language : 'en';
  const locale = getLocaleForLanguage(safeLang);
  const options: Intl.DateTimeFormatOptions = withTime
    ? { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
    : { day: 'numeric', month: 'long', year: 'numeric' };

  return date.toLocaleString(locale, options);
}


