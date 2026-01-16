-- Fix company rating count to only count approved evaluations
-- This ensures that companies_metadata.rating_count only includes approved evaluations

-- Update the function to filter by is_approved = true
CREATE OR REPLACE FUNCTION public.update_company_rating_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update the rating count (only approved evaluations)
  INSERT INTO public.companies_metadata (company_slug, rating_count, average_rating, updated_at)
  SELECT 
    NEW.company_slug,
    COUNT(*),
    AVG(rating),
    now()
  FROM public.company_evaluations
  WHERE company_slug = NEW.company_slug
    AND is_approved = true
  ON CONFLICT (company_slug) 
  DO UPDATE SET 
    rating_count = (SELECT COUNT(*) FROM public.company_evaluations WHERE company_slug = NEW.company_slug AND is_approved = true),
    average_rating = (SELECT AVG(rating) FROM public.company_evaluations WHERE company_slug = NEW.company_slug AND is_approved = true),
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add trigger for UPDATE to handle when is_approved status changes
DROP TRIGGER IF EXISTS trigger_update_company_rating_count_on_update ON public.company_evaluations;

CREATE TRIGGER trigger_update_company_rating_count_on_update
AFTER UPDATE OF is_approved ON public.company_evaluations
FOR EACH ROW
WHEN (OLD.is_approved IS DISTINCT FROM NEW.is_approved)
EXECUTE FUNCTION public.update_company_rating_count();

-- Recalculate all rating counts to fix existing data
UPDATE public.companies_metadata cm
SET 
  rating_count = COALESCE((
    SELECT COUNT(*) 
    FROM public.company_evaluations ce 
    WHERE ce.company_slug = cm.company_slug 
      AND ce.is_approved = true
  ), 0),
  average_rating = COALESCE((
    SELECT AVG(rating) 
    FROM public.company_evaluations ce 
    WHERE ce.company_slug = cm.company_slug 
      AND ce.is_approved = true
  ), 0),
  updated_at = now();

-- Insert metadata for companies that have approved evaluations but no metadata entry
INSERT INTO public.companies_metadata (company_slug, rating_count, average_rating, updated_at)
SELECT 
  company_slug,
  COUNT(*) as rating_count,
  AVG(rating) as average_rating,
  now() as updated_at
FROM public.company_evaluations
WHERE is_approved = true
GROUP BY company_slug
ON CONFLICT (company_slug) DO NOTHING;

