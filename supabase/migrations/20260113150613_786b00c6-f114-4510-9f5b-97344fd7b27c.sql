-- ================================================
-- Task 1: Create proper RBAC system with user_roles
-- ================================================

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing roles (admins can see all, users can see their own)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Add admin role to mark.lindt.finance@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'mark.lindt.finance@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Drop old admin policies that directly check email
DROP POLICY IF EXISTS "Admin can update any discussion for moderation" ON public.forum_discussions;
DROP POLICY IF EXISTS "Admin can delete any discussion for moderation" ON public.forum_discussions;
DROP POLICY IF EXISTS "Admin can update any reply for moderation" ON public.forum_replies;
DROP POLICY IF EXISTS "Admin can update any evaluation for moderation" ON public.company_evaluations;
DROP POLICY IF EXISTS "Admin can delete any evaluation for moderation" ON public.company_evaluations;

-- Create new admin policies using has_role function
CREATE POLICY "Admin can update any discussion"
ON public.forum_discussions
FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete any discussion"
ON public.forum_discussions
FOR DELETE
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Admin can update any reply"
ON public.forum_replies
FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete any reply"
ON public.forum_replies
FOR DELETE
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Admin can update any evaluation"
ON public.company_evaluations
FOR UPDATE
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete any evaluation"
ON public.company_evaluations
FOR DELETE
USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

-- ================================================
-- Task 4: Create market_prices table for caching
-- ================================================

CREATE TABLE public.market_prices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol text NOT NULL,
    market_type text NOT NULL, -- 'stocks', 'indices', 'crypto', 'commodities', 'currencies'
    name text NOT NULL,
    price numeric NOT NULL,
    change numeric DEFAULT 0,
    change_percent numeric DEFAULT 0,
    high numeric,
    low numeric,
    volume text,
    source text, -- 'finnhub', 'yahoo', 'mock', etc.
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (symbol, market_type)
);

-- Enable RLS
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;

-- Allow public read access (market data is public)
CREATE POLICY "Market prices are publicly readable"
ON public.market_prices
FOR SELECT
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_market_prices_type ON public.market_prices(market_type);
CREATE INDEX idx_market_prices_symbol ON public.market_prices(symbol);
CREATE INDEX idx_market_prices_updated ON public.market_prices(updated_at DESC);

-- ================================================
-- Task 5: Add rating_count to companies metadata
-- ================================================

-- Create companies_metadata table to store rating counts
CREATE TABLE public.companies_metadata (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_slug text NOT NULL UNIQUE,
    rating_count integer DEFAULT 0,
    average_rating numeric DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.companies_metadata ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Companies metadata is publicly readable"
ON public.companies_metadata
FOR SELECT
USING (true);

-- Create function to update company rating count when new evaluation is added
CREATE OR REPLACE FUNCTION public.update_company_rating_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update the rating count
  INSERT INTO public.companies_metadata (company_slug, rating_count, average_rating, updated_at)
  SELECT 
    NEW.company_slug,
    COUNT(*),
    AVG(rating),
    now()
  FROM public.company_evaluations
  WHERE company_slug = NEW.company_slug
  ON CONFLICT (company_slug) 
  DO UPDATE SET 
    rating_count = (SELECT COUNT(*) FROM public.company_evaluations WHERE company_slug = NEW.company_slug),
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to update rating count on new evaluation
CREATE TRIGGER trigger_update_company_rating_count
AFTER INSERT ON public.company_evaluations
FOR EACH ROW
EXECUTE FUNCTION public.update_company_rating_count();

-- Seed initial rating counts from existing evaluations
INSERT INTO public.companies_metadata (company_slug, rating_count, average_rating)
SELECT 
  company_slug,
  COUNT(*),
  AVG(rating)
FROM public.company_evaluations
GROUP BY company_slug
ON CONFLICT (company_slug) DO UPDATE SET
  rating_count = EXCLUDED.rating_count,
  average_rating = EXCLUDED.average_rating;