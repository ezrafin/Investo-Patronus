import { getLocaleForLanguage } from '@/lib/i18n';

export function safeParseDate(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatNewsDate(
  value: string | null | undefined,
  language: string,
  withTime = true,
): string | null {
  const date = safeParseDate(value);
  if (!date) return null;

  const locale = getLocaleForLanguage(language);
  const options: Intl.DateTimeFormatOptions = withTime
    ? { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
    : { day: 'numeric', month: 'long', year: 'numeric' };

  return date.toLocaleString(locale, options);
}


