-- Migration: Bulk import of 46,000 user profiles
-- Note: These profiles won't have corresponding auth.users entries
-- They are created for data purposes only (e.g., company evaluations)

-- Step 1: Temporarily disable RLS
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Step 2: Temporarily drop foreign key constraint
-- This allows us to create profiles without corresponding auth.users entries
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Step 3: Create function to generate bulk profiles
CREATE OR REPLACE FUNCTION public.bulk_create_profiles(count INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  i INTEGER;
  user_id UUID;
  username_text TEXT;
  display_name_text TEXT;
  joined_date TIMESTAMP WITH TIME ZONE;
  reputation_val INTEGER;
  posts_val INTEGER;
BEGIN
  FOR i IN 1..count LOOP
    -- Generate UUID
    user_id := gen_random_uuid();
    
    -- Generate username (unique)
    username_text := 'user_' || LPAD(i::TEXT, 6, '0');
    
    -- Generate display name
    display_name_text := 'User ' || i;
    
    -- Generate random join date (within last 2 years)
    joined_date := NOW() - (RANDOM() * INTERVAL '730 days');
    
    -- Generate random reputation (0-500)
    reputation_val := FLOOR(RANDOM() * 501)::INTEGER;
    
    -- Generate random posts count (0-100)
    posts_val := FLOOR(RANDOM() * 101)::INTEGER;
    
    -- Insert profile
    INSERT INTO public.profiles (
      id,
      username,
      display_name,
      reputation_score,
      posts_count,
      joined_at,
      created_at,
      updated_at
    ) VALUES (
      user_id,
      username_text,
      display_name_text,
      reputation_val,
      posts_val,
      joined_date,
      joined_date,
      joined_date
    )
    ON CONFLICT (id) DO NOTHING
    ON CONFLICT (username) DO NOTHING;
    
    -- Progress indicator every 5000 records
    IF i % 5000 = 0 THEN
      RAISE NOTICE 'Created % profiles', i;
    END IF;
  END LOOP;
  
  RAISE NOTICE 'Bulk profile creation completed. Total: % profiles', count;
END;
$$;

-- Step 4: Execute bulk creation (46,000 profiles)
SELECT public.bulk_create_profiles(46000);

-- Step 5: Clean up function
DROP FUNCTION IF EXISTS public.bulk_create_profiles(INTEGER);

-- Step 6: Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Note: Foreign key constraint is intentionally not restored
-- as these profiles don't have corresponding auth.users entries
-- If you need to restore it later, run:
-- ALTER TABLE public.profiles ADD CONSTRAINT profiles_id_fkey 
--   FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

