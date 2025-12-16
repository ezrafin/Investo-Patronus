-- Rate Limiting Migration
-- Prevents spam by tracking and limiting user actions

-- Rate limit attempts table
CREATE TABLE IF NOT EXISTS public.rate_limit_attempts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    ip_address inet,
    action_type text NOT NULL, -- 'create_discussion', 'create_reply', 'create_reaction'
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT rate_limit_attempts_action_type_check CHECK (
        action_type IN ('create_discussion', 'create_reply', 'create_reaction', 'create_bookmark')
    )
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_attempts_user_action_time 
ON public.rate_limit_attempts (user_id, action_type, created_at DESC) 
WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_rate_limit_attempts_ip_action_time 
ON public.rate_limit_attempts (ip_address, action_type, created_at DESC) 
WHERE ip_address IS NOT NULL;

-- Function to check rate limit
CREATE OR REPLACE FUNCTION check_rate_limit(
    p_user_id uuid,
    p_ip_address inet,
    p_action_type text,
    p_max_attempts integer DEFAULT 10,
    p_window_seconds integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    attempt_count integer;
BEGIN
    -- Count attempts in the time window
    SELECT COUNT(*) INTO attempt_count
    FROM public.rate_limit_attempts
    WHERE 
        (user_id = p_user_id OR ip_address = p_ip_address)
        AND action_type = p_action_type
        AND created_at > NOW() - (p_window_seconds || ' seconds')::interval;

    -- If limit exceeded, return false
    IF attempt_count >= p_max_attempts THEN
        RETURN false;
    END IF;

    -- Record this attempt
    INSERT INTO public.rate_limit_attempts (user_id, ip_address, action_type)
    VALUES (p_user_id, p_ip_address, p_action_type);

    -- Clean up old records (older than 1 hour)
    DELETE FROM public.rate_limit_attempts
    WHERE created_at < NOW() - INTERVAL '1 hour';

    RETURN true;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION check_rate_limit TO authenticated;
GRANT EXECUTE ON FUNCTION check_rate_limit TO anon;

-- Enable RLS
ALTER TABLE public.rate_limit_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own rate limit attempts (for debugging)
CREATE POLICY "Users can view own rate limit attempts" ON public.rate_limit_attempts
    FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

