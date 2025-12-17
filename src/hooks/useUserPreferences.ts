import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

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
        return;
      }

      // For logged users, load from database first, then merge with localStorage
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('email_notifications, push_notifications')
          .eq('id', user.id)
          .single();

        if (!error && profile) {
          // Load notification preferences from DB
          const dbPrefs: Partial<UserPreferences> = {
            email_notifications: profile.email_notifications ?? defaultPreferences.email_notifications,
            push_notifications: profile.push_notifications ?? defaultPreferences.push_notifications,
          };

          // Merge with localStorage preferences
          let localPrefs: Partial<UserPreferences> = {};
          if (isLocalStorageAvailable()) {
            try {
              const saved = localStorage.getItem('userPreferences');
              if (saved) {
                localPrefs = JSON.parse(saved);
              }
            } catch (e) {
              console.error('Error loading local preferences:', e);
            }
          }

          setPreferences({ ...defaultPreferences, ...localPrefs, ...dbPrefs });
        } else {
          // Fallback to localStorage if DB query fails
          if (isLocalStorageAvailable()) {
            try {
              const saved = localStorage.getItem('userPreferences');
              if (saved) {
                const parsed = JSON.parse(saved);
                setPreferences({ ...defaultPreferences, ...parsed });
              }
            } catch (e) {
              console.error('Error loading preferences:', e);
            }
          }
        }
      } catch (e) {
        console.error('Error loading preferences from DB:', e);
        // Fallback to localStorage
        if (isLocalStorageAvailable()) {
          try {
            const saved = localStorage.getItem('userPreferences');
            if (saved) {
              const parsed = JSON.parse(saved);
              setPreferences({ ...defaultPreferences, ...parsed });
            }
          } catch {
            // Ignore
          }
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
        localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      } catch (e) {
        console.error('Error saving preferences to localStorage:', e);
        // Check if quota exceeded
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, clearing old data');
          try {
            localStorage.removeItem('userPreferences');
            localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
          } catch {
            // Give up if still failing
          }
        }
      }
    }

    // If user is logged in, also save notification preferences to database
    if (user && (updates.email_notifications !== undefined || updates.push_notifications !== undefined)) {
      try {
        const dbUpdates: { email_notifications?: boolean; push_notifications?: boolean } = {};
        if (updates.email_notifications !== undefined) {
          dbUpdates.email_notifications = updates.email_notifications;
        }
        if (updates.push_notifications !== undefined) {
          dbUpdates.push_notifications = updates.push_notifications;
        }

        const { error } = await supabase
          .from('profiles')
          .update(dbUpdates)
          .eq('id', user.id);

        if (error) {
          console.error('Error saving notification preferences to database:', error);
        }
      } catch (e) {
        console.error('Error updating notification preferences:', e);
      }
    }
  };

  return { preferences, loading, updatePreferences };
}
