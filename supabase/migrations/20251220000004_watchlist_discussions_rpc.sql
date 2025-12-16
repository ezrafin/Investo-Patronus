-- Watchlist Discussions RPC Function
-- Returns forum discussions related to assets in a user's watchlist

CREATE OR REPLACE FUNCTION public.get_discussions_for_watchlist(
  p_user_id uuid
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  author_name text,
  category text,
  symbol text,
  asset_type text,
  reply_count integer,
  view_count integer,
  like_count integer,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    d.id,
    d.title,
    d.content,
    d.author_name,
    d.category,
    d.symbol,
    d.asset_type,
    d.reply_count,
    d.view_count,
    d.like_count,
    d.created_at,
    d.updated_at
  FROM public.forum_discussions d
  INNER JOIN public.watchlist_items wi ON wi.symbol = d.symbol
  INNER JOIN public.watchlists w ON w.id = wi.watchlist_id
  WHERE 
    w.user_id = p_user_id
    AND d.symbol IS NOT NULL
    AND d.asset_type IS NOT NULL
  ORDER BY d.created_at DESC
  LIMIT 20;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_discussions_for_watchlist TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_discussions_for_watchlist TO anon;

