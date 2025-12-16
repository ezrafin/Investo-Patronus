-- Forum Asset Linking Migration
-- Add fields to link forum discussions to specific assets (stocks, crypto, etc.)

-- Add symbol and asset_type columns to forum_discussions
ALTER TABLE public.forum_discussions
ADD COLUMN IF NOT EXISTS symbol text,
ADD COLUMN IF NOT EXISTS asset_type text;

-- Add constraint for asset_type values
ALTER TABLE public.forum_discussions
ADD CONSTRAINT IF NOT EXISTS forum_discussions_asset_type_check 
CHECK (asset_type IS NULL OR asset_type IN ('stock', 'crypto', 'index', 'commodity', 'currency', 'etf'));

-- Add index for filtering discussions by asset
CREATE INDEX IF NOT EXISTS idx_forum_discussions_symbol_asset_type 
ON public.forum_discussions (symbol, asset_type) 
WHERE symbol IS NOT NULL;

-- Add index for filtering by symbol only (for watchlist queries)
CREATE INDEX IF NOT EXISTS idx_forum_discussions_symbol 
ON public.forum_discussions (symbol) 
WHERE symbol IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.forum_discussions.symbol IS 'Ticker symbol or identifier for the asset (e.g., AAPL, BTC, SPX)';
COMMENT ON COLUMN public.forum_discussions.asset_type IS 'Type of asset: stock, crypto, index, commodity, currency, or etf';

