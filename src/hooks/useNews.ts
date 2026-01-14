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
  totalCount: number;
}

interface UseNewsResult {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  totalCount: number;
  refetch: () => void;
}

interface UseNewsOptions {
  market?: string;
  page?: number;
  pageSize?: number;
}

async function fetchNewsData(
  market: string,
  page: number,
  pageSize: number,
  forceRefresh = false
): Promise<NewsData> {
  const offset = (page - 1) * pageSize;

  // Build query with server-side pagination
  let query = supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (market !== 'all') {
    query = query.eq('market', market);
  }

  const { data: articles, error: dbError, count } = await query;

  // Get last fetch time
  let lastUpdated: string | null = null;
  const { data: fetchLog } = await supabase
    .from('news_fetch_log')
    .select('last_fetched_at')
    .order('last_fetched_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchLog) {
    lastUpdated = fetchLog.last_fetched_at;
  }

  if (dbError) {
    logger.error('Error fetching news:', dbError);
    throw dbError;
  }

  // If no data and force refresh, try to fetch from edge function
  if (forceRefresh || (!articles || articles.length === 0)) {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-news', {
        body: { market, forceRefresh: true }
      });

      if (!fnError && data?.articles) {
        // After refresh, re-query to get paginated results
        let refreshQuery = supabase
          .from('news_articles')
          .select('*', { count: 'exact' })
          .order('published_at', { ascending: false })
          .range(offset, offset + pageSize - 1);
        
        if (market !== 'all') {
          refreshQuery = refreshQuery.eq('market', market);
        }

        const { data: freshArticles, count: freshCount } = await refreshQuery;

        return {
          articles: freshArticles || [],
          lastUpdated: data.lastUpdated || lastUpdated,
          totalCount: freshCount || 0,
        };
      }
    } catch (error) {
      logger.error('Error refreshing news from API:', error);
    }
  }

  return {
    articles: articles || [],
    lastUpdated,
    totalCount: count || 0,
  };
}

export function useNews(options: UseNewsOptions | string = {}): UseNewsResult {
  // Support legacy string parameter (market)
  const normalizedOptions: UseNewsOptions = typeof options === 'string' 
    ? { market: options } 
    : options;
  
  const { market = 'all', page = 1, pageSize = 15 } = normalizedOptions;

  const { data, isLoading, error, refetch: queryRefetch } = useQuery<NewsData, Error>({
    queryKey: ['news', market, page, pageSize],
    queryFn: () => fetchNewsData(market, page, pageSize, false),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes background refresh
    refetchIntervalInBackground: true,
  });

  const refetch = () => {
    void queryRefetch();
  };

  return {
    news: data?.articles || [],
    loading: isLoading,
    error: error?.message || null,
    lastUpdated: data?.lastUpdated || null,
    totalCount: data?.totalCount || 0,
    refetch,
  };
}
