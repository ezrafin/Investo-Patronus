import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
<<<<<<< Updated upstream
=======
import { supabase } from '@/integrations/supabase/client';
import { detectBrowserLanguage } from '@/lib/i18n';
>>>>>>> Stashed changes

export interface UserPreferences {
  theme: 'light' | 'dark' | 'desert';
  default_markets: string[];
  refresh_interval: number;
  email_notifications: boolean;
  push_notifications: boolean;
  preferred_topics: string[];
  language: string;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  default_markets: ['indices', 'stocks', 'crypto'],
  refresh_interval: 120000,
  email_notifications: false,
  push_notifications: false,
  preferred_topics: [],
  language: 'en',
};

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function useUserPreferences() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
<<<<<<< Updated upstream
      // Use localStorage for all preferences (both logged in and anonymous users)
      if (!isLocalStorageAvailable()) {
        setLoading(false);
=======
      if (!user) {
        // For non-logged users, use localStorage only
        if (!isLocalStorageAvailable()) {
          setLoading(false);
          return;
        }

        try {
          const saved = localStorage.getItem('userPreferences');
          if (saved) {
            const parsed = JSON.parse(saved);
            setPreferences({ ...defaultPreferences, ...parsed });
          } else {
            // First visit - detect browser language
            const detectedLang = detectBrowserLanguage();
            const initialPrefs = { ...defaultPreferences, language: detectedLang };
            setPreferences(initialPrefs);
            // Save detected language
            try {
              localStorage.setItem('userPreferences', JSON.stringify(initialPrefs));
            } catch {
              // Ignore save errors
            }
          }
        } catch (e) {
          console.error('Error loading preferences:', e);
          try {
            localStorage.removeItem('userPreferences');
            // On error, use browser language detection
            const detectedLang = detectBrowserLanguage();
            setPreferences({ ...defaultPreferences, language: detectedLang });
          } catch {
            // Ignore cleanup errors
          }
        } finally {
          setLoading(false);
        }
>>>>>>> Stashed changes
        return;
      }

      try {
        const storageKey = user ? `userPreferences_${user.id}` : 'userPreferences';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setPreferences({ ...defaultPreferences, ...parsed });
        }
      } catch (e) {
        console.error('Error loading preferences:', e);
        try {
          localStorage.removeItem('userPreferences');
        } catch {
          // Ignore cleanup errors
        }
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    // Save to localStorage
    if (isLocalStorageAvailable()) {
      try {
        const storageKey = user ? `userPreferences_${user.id}` : 'userPreferences';
        localStorage.setItem(storageKey, JSON.stringify(newPreferences));
      } catch (e) {
        console.error('Error saving preferences to localStorage:', e);
        // Check if quota exceeded
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, clearing old data');
          try {
            const storageKey = user ? `userPreferences_${user.id}` : 'userPreferences';
            localStorage.removeItem(storageKey);
            localStorage.setItem(storageKey, JSON.stringify(newPreferences));
          } catch {
            // Give up if still failing
          }
        }
      }
    }
  };

  return { preferences, loading, updatePreferences };
}
