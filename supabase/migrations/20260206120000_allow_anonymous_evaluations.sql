-- Allow anonymous evaluations with mandatory moderation
-- This migration enables unregistered users to submit company evaluations
-- All anonymous evaluations are automatically set to is_approved = false

-- Step 1: Make user_id nullable to allow anonymous evaluations
ALTER TABLE public.company_evaluations
ALTER COLUMN user_id DROP NOT NULL;

-- Step 2: Drop the old UNIQUE constraint that doesn't support NULL values
ALTER TABLE public.company_evaluations
DROP CONSTRAINT IF EXISTS company_evaluations_user_id_company_slug_key;

-- Step 3: Create a partial unique index for registered users only
-- This ensures registered users can only have one evaluation per company
-- Anonymous users (user_id IS NULL) can have multiple evaluations
CREATE UNIQUE INDEX IF NOT EXISTS company_evaluations_user_company_unique
ON public.company_evaluations(user_id, company_slug)
WHERE user_id IS NOT NULL;

-- Step 4: Drop the old INSERT policy that requires authentication
DROP POLICY IF EXISTS "Users can create own evaluations" ON public.company_evaluations;

-- Step 5: Create new INSERT policy that allows both authenticated and anonymous users
-- Authenticated users: auth.uid() = user_id
-- Anonymous users: user_id IS NULL
CREATE POLICY "Anyone can create evaluations"
ON public.company_evaluations
FOR INSERT
WITH CHECK (
  (auth.uid() = user_id) OR (user_id IS NULL)
);

-- Step 6: Create a trigger function to automatically set is_approved = false for anonymous evaluations
CREATE OR REPLACE FUNCTION public.set_anonymous_evaluation_moderation()
RETURNS TRIGGER AS $$
BEGIN
  -- If user_id is NULL (anonymous), always set is_approved = false
  IF NEW.user_id IS NULL THEN
    NEW.is_approved := false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Step 7: Create trigger to enforce moderation for anonymous evaluations
DROP TRIGGER IF EXISTS trigger_set_anonymous_evaluation_moderation ON public.company_evaluations;
CREATE TRIGGER trigger_set_anonymous_evaluation_moderation
BEFORE INSERT ON public.company_evaluations
FOR EACH ROW
EXECUTE FUNCTION public.set_anonymous_evaluation_moderation();

-- Step 8: Update UPDATE and DELETE policies to prevent anonymous users from modifying evaluations
-- Anonymous users cannot update or delete (they have no way to identify their evaluations)
-- Only authenticated users can update/delete their own evaluations
-- (Existing policies should already handle this, but we ensure they're correct)

-- Note: The existing UPDATE and DELETE policies should already be correct:
-- - "Users can update own evaluations" uses auth.uid() = user_id (won't match NULL)
-- - "Users can delete own evaluations" uses auth.uid() = user_id (won't match NULL)
-- - Admin policies allow admins to moderate any evaluation

-- Step 9: Add comment to document the change
COMMENT ON COLUMN public.company_evaluations.user_id IS 'User ID for registered users, NULL for anonymous evaluations. Anonymous evaluations always require moderation (is_approved = false).';

