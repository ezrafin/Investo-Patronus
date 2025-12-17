import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { detectBrowserLanguage, loadTranslation, type SupportedLanguage } from '@/lib/i18n';

interface I18nContextType {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => Promise<void>;
  translations: Record<string, Record<string, any>>;
  loading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { preferences, loading: preferencesLoading, updatePreferences } = useUserPreferences();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [translations, setTranslations] = useState<Record<string, Record<string, any>>>({});
  const [loading, setLoading] = useState(true);

  // Initialize language on mount
  useEffect(() => {
    if (preferencesLoading) return;

    let initialLanguage: SupportedLanguage = 'en';

    // Priority: 1. User preference, 2. Browser language, 3. Default (en)
    if (preferences.language && ['en', 'zh', 'es', 'ru', 'de', 'fr', 'pl'].includes(preferences.language)) {
      initialLanguage = preferences.language as SupportedLanguage;
    } else {
      // Check if user has ever set a language preference
      const hasLanguagePreference = localStorage.getItem('userPreferences');
      if (!hasLanguagePreference) {
        // First visit - detect browser language
        initialLanguage = detectBrowserLanguage();
      } else {
        // User has preferences but no language set - use browser language
        initialLanguage = detectBrowserLanguage();
      }
    }

    setLanguage(initialLanguage);
    loadTranslationsForLanguage(initialLanguage);
  }, [preferences.language, preferencesLoading, loadTranslationsForLanguage]);

  const loadTranslationsForLanguage = useCallback(async (lang: SupportedLanguage) => {
    setLoading(true);
    try {
      // Load common translations first (most important)
      const [common, ui] = await Promise.all([
        loadTranslation(lang, 'common'),
        loadTranslation(lang, 'ui'),
      ]);

      setTranslations({
        common,
        ui,
      });
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    if (lang === language) return;

    setLanguage(lang);
    await loadTranslationsForLanguage(lang);

    // Update user preferences
    await updatePreferences({ language: lang });
  }, [language, loadTranslationsForLanguage, updatePreferences]);

  return (
    <I18nContext.Provider value={{ language, changeLanguage, translations, loading }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

