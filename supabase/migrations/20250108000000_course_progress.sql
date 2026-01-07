-- Create course progress table
CREATE TABLE IF NOT EXISTS public.course_progress (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id text NOT NULL,
    completed_lessons text[] DEFAULT '{}' NOT NULL,
    completed_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, course_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_course_progress_user_course ON public.course_progress(user_id, course_id);

-- Enable Row Level Security
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own course progress" ON public.course_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own course progress" ON public.course_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own course progress" ON public.course_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_course_progress_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_course_progress_updated_at
    BEFORE UPDATE ON public.course_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.update_course_progress_updated_at();

