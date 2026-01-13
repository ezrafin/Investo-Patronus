import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export interface NewsArticle {
  id: string;
  external_id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  url: string | null;
  image_url: string | null;
  source_name: string;
  source_id: string | null;
  author: string | null;
  published_at: string;
  market: string;
  fetched_at: string;
  created_at: string;
}

interface NewsData {
  articles: NewsArticle[];
  lastUpdated: string | null;
}

interface UseNewsResult {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => void;
}

async function fetchNewsData(market: string, forceRefresh = false): Promise<NewsData> {
  // Step 1: Try to load cached news from database (fast)
  // Increased limit to support proper pagination (was 50, now 1000)
  let query = supabase
    .from('news_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(1000);

  if (market !== 'all') {
    query = query.eq('market', market);
  }

  const { data: cachedArticles, error: dbError } = await query;

  // Get last fetch time
  let lastUpdated: string | null = null;
  if (!dbError && cachedArticles && cachedArticles.length > 0) {
    const { data: fetchLog } = await supabase
      .from('news_fetch_log')
      .select('last_fetched_at')
      .order('last_fetched_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (fetchLog) {
      lastUpdated = fetchLog.last_fetched_at;
    }
  }

  // Step 2: If forceRefresh or no cached data, fetch from edge function
  if (forceRefresh || !cachedArticles || cachedArticles.length === 0) {
    const { data, error: fnError } = await supabase.functions.invoke('fetch-news', {
      body: { market, forceRefresh }
    });

    if (fnError) {
      // If edge function fails but we have cached data, return cached
      if (cachedArticles && cachedArticles.length > 0) {
        return { articles: cachedArticles, lastUpdated };
      }
      throw fnError;
    }

    if (data?.articles) {
      return {
        articles: data.articles,
        lastUpdated: data.lastUpdated || lastUpdated,
      };
    }
  }

  // Return cached data (or empty if no cache and no API response)
  return {
    articles: cachedArticles || [],
    lastUpdated,
  };
}

export function useNews(market: string = 'all'): UseNewsResult {
  const { data, isLoading, error, refetch: queryRefetch } = useQuery<NewsData, Error>({
    queryKey: ['news', market],
    queryFn: () => fetchNewsData(market, false),
    staleTime: 2 * 60 * 1000, // 2 minutes - news can be slightly stale
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes in background
    refetchIntervalInBackground: true,
  });

  const refetch = () => {
    // Force refresh from API
    void queryRefetch();
  };

  return {
    news: data?.articles || [],
    loading: isLoading,
    error: error?.message || null,
    lastUpdated: data?.lastUpdated || null,
    refetch,
  };
}
