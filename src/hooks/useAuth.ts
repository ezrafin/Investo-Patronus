import { useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

/**
 * Validate password strength
 */
function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { valid: false, message: 'Password must be less than 128 characters' };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }
  
  // Check for common weak passwords
  const commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123'];
  const lowerPassword = password.toLowerCase();
  if (commonPasswords.some(common => lowerPassword.includes(common))) {
    return { valid: false, message: 'Password is too common. Please choose a stronger password' };
  }
  
  return { valid: true };
}

export interface UserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  reputation: number;
  post_count: number;
  comment_count: number;
  privacy_level: 'public' | 'private' | 'friends';
}

interface UseAuthReturn {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'github' | 'apple') => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const PROFILE_LOAD_TIMEOUT = 10000; // 10 seconds

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Cleanup function for timeout
  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  // Set a safety timeout to prevent infinite loading
  const setLoadingWithTimeout = () => {
    clearLoadingTimeout();
    loadingTimeoutRef.current = setTimeout(() => {
      logger.warn('Auth loading timeout - forcing loading state to false');
      setLoading(false);
    }, PROFILE_LOAD_TIMEOUT);
  };

  useEffect(() => {
    // Prevent double initialization in React strict mode
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Set initial loading timeout
    setLoadingWithTimeout();

    // CRITICAL: Set up auth state listener FIRST (synchronous updates only!)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      // Synchronous state updates only - no async operations here!
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setLoading(false);
        clearLoadingTimeout();
        // Clear auth rate limits on sign out
        if (currentSession?.user?.email) {
          try {
            const { clearAuthRateLimit } = await import('@/lib/auth/rateLimit');
            clearAuthRateLimit('login', currentSession.user.email.toLowerCase());
          } catch (error) {
            logger.warn('Failed to clear rate limits:', error);
          }
        }
        return;
      }

      // Handle password recovery - don't load profile, allow user to reset password
      if (event === 'PASSWORD_RECOVERY') {
        // User is on password reset page, don't load profile to prevent auto-login
        // Session is set but profile loading is skipped
        setLoading(false);
        clearLoadingTimeout();
        return;
      }

      // Handle token refresh
      if (event === 'TOKEN_REFRESHED' && currentSession) {
        // Session is already updated, just ensure profile is loaded
        if (currentSession.user) {
          setTimeout(() => {
            loadProfile(currentSession.user.id);
          }, 0);
        }
        return;
      }

      if (currentSession?.user) {
        // Defer profile loading with setTimeout to avoid deadlock
        setTimeout(() => {
          loadProfile(currentSession.user.id);
        }, 0);
      } else {
        setProfile(null);
        setLoading(false);
        clearLoadingTimeout();
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        // Defer profile loading
        setTimeout(() => {
          loadProfile(existingSession.user.id);
        }, 0);
      } else {
        setLoading(false);
        clearLoadingTimeout();
      }
    }).catch((error) => {
      logger.error('Error getting session:', error);
      setLoading(false);
      clearLoadingTimeout();
    });

    return () => {
      subscription.unsubscribe();
      clearLoadingTimeout();
    };
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await (supabase
        .from('profiles' as any)
        .select('*')
        .eq('id', userId)
        .maybeSingle() as any);

      if (error) {
        logger.error('Profile load error:', error);
        throw error;
      }
      
      if (data) {
        setProfile({
          id: data.id,
          username: data.username,
          display_name: data.display_name,
          bio: data.bio,
          avatar_url: data.avatar_url,
          reputation: data.reputation_score || 0,
          post_count: data.posts_count || 0,
          comment_count: 0,
          privacy_level: data.privacy_level || 'public',
        });
      }
    } catch (error) {
      logger.error('Error loading profile:', error);
    } finally {
      setLoading(false);
      clearLoadingTimeout();
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check rate limit before attempting login
    const { checkAuthRateLimit, clearAuthRateLimit } = await import('@/lib/auth/rateLimit');
    const rateLimitCheck = await checkAuthRateLimit('login', email.toLowerCase());
    
    if (!rateLimitCheck.allowed) {
      const error = new Error(rateLimitCheck.message || 'Too many login attempts');
      return { error };
    }

    setLoading(true);
    setLoadingWithTimeout();
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setLoading(false);
        clearLoadingTimeout();
        // Don't clear rate limit on error - it's already recorded
        return { error };
      }
      
      // Clear rate limit on successful login
      clearAuthRateLimit('login', email.toLowerCase());
      return { error: null };
    } catch (error) {
      setLoading(false);
      clearLoadingTimeout();
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    // Check rate limit before attempting signup
    const { checkAuthRateLimit, clearAuthRateLimit } = await import('@/lib/auth/rateLimit');
    const rateLimitCheck = await checkAuthRateLimit('signup', email.toLowerCase());
    
    if (!rateLimitCheck.allowed) {
      const error = new Error(rateLimitCheck.message || 'Too many signup attempts');
      return { error };
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return { error: new Error(passwordValidation.message || 'Password does not meet requirements') };
    }

    setLoading(true);
    setLoadingWithTimeout();
    const redirectUrl = `${window.location.origin}/auth/callback`;
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: username || email.split('@')[0],
            display_name: username || email.split('@')[0],
          },
        },
      });
      
      if (error) {
        setLoading(false);
        clearLoadingTimeout();
        return { error };
      }
      
      // Clear rate limit on successful signup
      clearAuthRateLimit('signup', email.toLowerCase());
      return { error: null };
    } catch (error) {
      setLoading(false);
      clearLoadingTimeout();
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    // Clear state immediately for responsive UI
    setUser(null);
    setProfile(null);
    setSession(null);
    
    try {
      // Sign out from all devices/tabs
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        logger.error('Sign out error:', error);
        // Even if signOut fails, clear local state
      }
      
      // Clear any cached auth data
      try {
        localStorage.removeItem('supabase.auth.token');
        // Clear rate limit data
        if (user?.email) {
          const { clearAuthRateLimit } = await import('@/lib/auth/rateLimit');
          clearAuthRateLimit('login', user.email.toLowerCase());
        }
      } catch (clearError) {
        logger.warn('Failed to clear auth cache:', clearError);
      }
    } catch (error) {
      logger.error('Sign out exception:', error);
    }
    
    setLoading(false);
  };

  const signInWithOAuth = async (provider: 'google' | 'github' | 'apple') => {
    try {
      // Use Lovable Cloud for Google and Apple
      if (provider === 'google' || provider === 'apple') {
        const { lovable } = await import('@/integrations/lovable');
        // Lovable OAuth callback должен быть на Lovable домене
        const redirectUri = 'https://investo-patronus.lovable.app/~oauth/callback';
        const result = await lovable.auth.signInWithOAuth(provider, {
          redirect_uri: redirectUri,
        });
        
        if (result.error) {
          logger.error('OAuth error:', result.error);
          throw result.error;
        }
        return;
      }
      
      // Use Supabase OAuth for other providers (GitHub)
      const normalizeDomain = (url: string): string => {
        // Для localhost оставляем как есть
        if (url.includes('localhost')) {
          return url;
        }
        // Для production убираем www для консистентности
        return url.replace('www.', '');
      };
      
      const currentOrigin = normalizeDomain(window.location.origin);
      const redirectUrl = `${currentOrigin}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { 
          redirectTo: redirectUrl,
          skipBrowserRedirect: false,
          scopes: 'user:email',
        },
      });
      
      if (error) {
        logger.error('OAuth error:', error);
        throw error;
      }
    } catch (error) {
      logger.error('OAuth sign-in failed:', error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('Not authenticated') };

    // Optimistic update - update UI immediately
    const previousProfile = profile;
    if (previousProfile) {
      setProfile({
        ...previousProfile,
        ...updates,
      });
    }

    try {
      const { error } = await (supabase
        .from('profiles' as any)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id) as any);

      if (error) {
        // Rollback on error
        if (previousProfile) {
          setProfile(previousProfile);
        }
        return { error };
      }

      // Reload profile to ensure consistency with server
      await loadProfile(user.id);
      return { error: null };
    } catch (error) {
      // Rollback on exception
      if (previousProfile) {
        setProfile(previousProfile);
      }
      return { error: error as Error };
    }
  };

  return { user, profile, session, loading, signIn, signUp, signOut, signInWithOAuth, updateProfile };
}
