-- Database Indexes for Forum and Market Tables
-- These indexes optimize queries to keep serverless response times under 100-200ms

-- Forum Indexes

-- Fast listing of topics by category and creation time (most common query)
CREATE INDEX IF NOT EXISTS idx_forum_discussions_category_created 
ON public.forum_discussions (category, created_at DESC);

-- Fast access to replies by discussion (for topic detail pages)
CREATE INDEX IF NOT EXISTS idx_forum_replies_discussion_created 
ON public.forum_replies (discussion_id, created_at);

-- Fast lookup of user follows for discussions
CREATE INDEX IF NOT EXISTS idx_forum_follows_user_discussion 
ON public.forum_follows (user_id, discussion_id);

-- Additional useful indexes for forum

-- Index for pinned/featured topics (for homepage/trending)
CREATE INDEX IF NOT EXISTS idx_forum_discussions_pinned_created 
ON public.forum_discussions (is_pinned DESC, created_at DESC) 
WHERE is_pinned = true;

-- Index for popular topics (reply_count + view_count + like_count)
CREATE INDEX IF NOT EXISTS idx_forum_discussions_popularity 
ON public.forum_discussions (reply_count DESC, view_count DESC, like_count DESC, created_at DESC);

-- Index for user's own discussions (for profile pages)
CREATE INDEX IF NOT EXISTS idx_forum_discussions_user_created 
ON public.forum_discussions (user_id, created_at DESC) 
WHERE user_id IS NOT NULL;

-- Index for search by title/content (if full-text search is added later)
-- CREATE INDEX IF NOT EXISTS idx_forum_discussions_search 
-- ON public.forum_discussions USING gin(to_tsvector('english', title || ' ' || content));

-- Market Indexes (if market_snapshots table exists)

-- Check if market_snapshots table exists before creating index
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'market_snapshots'
  ) THEN
    -- Fast lookup of latest market data by symbol
    CREATE INDEX IF NOT EXISTS idx_market_snapshots_symbol_timestamp 
    ON public.market_snapshots (symbol, timestamp DESC);
    
    -- Index for time-range queries
    CREATE INDEX IF NOT EXISTS idx_market_snapshots_timestamp 
    ON public.market_snapshots (timestamp DESC);
  END IF;
END $$;

-- Analyze tables to update statistics for query planner
ANALYZE public.forum_discussions;
ANALYZE public.forum_replies;
ANALYZE public.forum_follows;

