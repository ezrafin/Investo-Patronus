-- Create the update function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create company evaluations table
CREATE TABLE public.company_evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_slug TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, company_slug)
);

-- Enable RLS
ALTER TABLE public.company_evaluations ENABLE ROW LEVEL SECURITY;

-- RLS policies for company evaluations
CREATE POLICY "Company evaluations are publicly readable"
ON public.company_evaluations FOR SELECT
USING (true);

CREATE POLICY "Users can create own evaluations"
ON public.company_evaluations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own evaluations"
ON public.company_evaluations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own evaluations"
ON public.company_evaluations FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updating updated_at
CREATE TRIGGER update_company_evaluations_updated_at
BEFORE UPDATE ON public.company_evaluations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();