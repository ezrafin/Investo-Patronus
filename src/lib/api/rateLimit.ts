import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export type RateLimitAction = 'create_discussion' | 'create_reply' | 'create_reaction' | 'create_bookmark';

/**
 * Check if user can perform an action based on rate limits
 * @param actionType The type of action being performed
 * @param maxAttempts Maximum attempts allowed in the time window (default: 10)
 * @param windowSeconds Time window in seconds (default: 60)
 * @returns true if action is allowed, false if rate limited
 */
export async function checkRateLimit(
  actionType: RateLimitAction,
  maxAttempts: number = 10,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; message?: string }> {
  try {
    // Get user IP (client-side approximation - real IP should come from server)
    // For now, we'll use a placeholder that will be handled server-side
    const ipAddress = '0.0.0.0'; // This should be set by server/edge function

    // RPC functions may not be fully typed in Database types
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_user_id: (await supabase.auth.getUser()).data.user?.id || null,
      p_ip_address: ipAddress,
      p_action_type: actionType,
      p_max_attempts: maxAttempts,
      p_window_seconds: windowSeconds,
    }) as { data: boolean | null; error: Error | null };

    if (error) {
      logger.error('Rate limit check error:', error);
      // On error, allow the action (fail open) but log it
      return { allowed: true };
    }

    if (data === false) {
      return {
        allowed: false,
        message: `Rate limit exceeded. Please wait ${windowSeconds} seconds before trying again.`,
      };
    }

    return { allowed: true };
  } catch (error) {
    logger.error('Rate limit check failed:', error);
    // Fail open - allow action if check fails
    return { allowed: true };
  }
}

