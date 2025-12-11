-- Add user_id column to forum_replies table
ALTER TABLE public.forum_replies ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Create INSERT policy for authenticated users
CREATE POLICY "Users can create own replies" 
ON public.forum_replies 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Create UPDATE policy for own replies
CREATE POLICY "Users can update own replies" 
ON public.forum_replies 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Create DELETE policy for own replies
CREATE POLICY "Users can delete own replies" 
ON public.forum_replies 
FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);