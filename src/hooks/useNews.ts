import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

interface UseNewsResult {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

export function useNews(market: string = 'all'): UseNewsResult {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchNews = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      // Call the edge function to fetch/refresh news
      const { data, error: fnError } = await supabase.functions.invoke('fetch-news', {
        body: { market, forceRefresh }
      });

      if (fnError) {
        console.error('Error calling fetch-news:', fnError);
        setError('Failed to fetch news');
        return;
      }

      if (data?.articles) {
        setNews(data.articles);
        setLastUpdated(data.lastUpdated);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [market]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refetch = useCallback(async () => {
    await fetchNews(true);
  }, [fetchNews]);

  return { news, loading, error, lastUpdated, refetch };
}
