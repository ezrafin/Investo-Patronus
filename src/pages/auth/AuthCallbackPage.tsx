import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for error in URL hash (OAuth errors)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const errorParam = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');
        
        if (errorParam) {
          console.error('OAuth error:', errorParam, errorDescription);
          setError(errorDescription || errorParam);
          setTimeout(() => navigate('/auth/login'), 3000);
          return;
        }

        // Check for access_token in hash (successful OAuth)
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken && refreshToken) {
          console.log('Setting session from OAuth tokens');
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (sessionError) {
            console.error('Session set error:', sessionError);
            setError(sessionError.message);
            setTimeout(() => navigate('/auth/login'), 3000);
            return;
          }
          
          // Clear the hash from URL
          window.history.replaceState(null, '', window.location.pathname);
          navigate('/');
          return;
        }

        // Fallback: Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Auth error:', sessionError);
          setError(sessionError.message);
          setTimeout(() => navigate('/auth/login'), 3000);
          return;
        }

        if (session) {
          console.log('Session found, redirecting to home');
          navigate('/');
        } else {
          console.log('No session found, redirecting to login');
          navigate('/auth/login');
        }
      } catch (error: any) {
        console.error('Callback error:', error);
        setError(error?.message || 'Authentication failed');
        setTimeout(() => navigate('/auth/login'), 3000);
      }
    };

    // Small delay to ensure auth state is processed
    const timeout = setTimeout(handleAuthCallback, 100);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          {error ? (
            <>
              <div className="text-destructive mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-destructive font-medium mb-2">Authentication Error</p>
              <p className="text-muted-foreground text-sm mb-4">{error}</p>
              <p className="text-muted-foreground text-xs">Redirecting to login...</p>
            </>
          ) : (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Completing sign in...</p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
