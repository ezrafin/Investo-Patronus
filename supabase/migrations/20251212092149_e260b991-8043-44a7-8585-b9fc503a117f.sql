-- Add user_id column to forum_discussions to link discussions to users
ALTER TABLE public.forum_discussions
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add tags column to forum_discussions
ALTER TABLE public.forum_discussions
ADD COLUMN tags text[] DEFAULT '{}';

-- Create RLS policy for users to insert their own discussions
CREATE POLICY "Users can create own discussions"
ON public.forum_discussions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create RLS policy for users to update their own discussions
CREATE POLICY "Users can update own discussions"
ON public.forum_discussions
FOR UPDATE
USING (auth.uid() = user_id);

-- Create RLS policy for users to delete their own discussions
CREATE POLICY "Users can delete own discussions"
ON public.forum_discussions
FOR DELETE
USING (auth.uid() = user_id);