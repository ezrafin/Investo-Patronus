-- Fix 1: Restrict user_achievements to owner-only viewing (was publicly readable)
DROP POLICY IF EXISTS "Achievements are publicly readable" ON public.user_achievements;
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements
FOR SELECT
USING (auth.uid() = user_id);

-- Fix 2: Remove conflicting overly-permissive SELECT policy on forum_replies
-- Keep only the filtered policy that respects is_approved
DROP POLICY IF EXISTS "Forum replies are publicly readable" ON public.forum_replies;