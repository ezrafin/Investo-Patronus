-- Update company_evaluations rating from 1-5 scale to 0-100 scale

-- First, update existing ratings to 100-point scale (multiply by 20)
UPDATE public.company_evaluations
SET rating = rating * 20
WHERE rating BETWEEN 1 AND 5;

-- Drop the old constraint
ALTER TABLE public.company_evaluations
DROP CONSTRAINT IF EXISTS company_evaluations_rating_check;

-- Add new constraint for 0-100 scale
ALTER TABLE public.company_evaluations
ADD CONSTRAINT company_evaluations_rating_check 
CHECK (rating >= 0 AND rating <= 100);

-- Add index for better performance when counting ratings
CREATE INDEX IF NOT EXISTS idx_company_evaluations_company_slug 
ON public.company_evaluations(company_slug);

