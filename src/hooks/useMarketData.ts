import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MarketData } from '@/lib/api';

interface UseMarketDataOptions {
  type: 'crypto' | 'stocks' | 'indices' | 'commodities' | 'currencies';
  refreshInterval?: number; // in milliseconds
}

interface UseMarketDataReturn {
  data: MarketData[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useMarketData({ type, refreshInterval = 60000 }: UseMarketDataOptions): UseMarketDataReturn {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      if (type === 'crypto') {
        const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-crypto');
        
        if (fetchError) throw fetchError;
        if (responseData?.data) {
          setData(responseData.data);
          setLastUpdated(new Date(responseData.timestamp));
        }
      } else {
        const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-stocks', {
          body: null,
          headers: {},
        });
        
        // For non-crypto, we need to pass query params via a different approach
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-stocks?type=${type}`,
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );
        
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const result = await response.json();
        if (result?.data) {
          setData(result.data);
          setLastUpdated(new Date(result.timestamp));
        }
      }
    } catch (err) {
      console.error(`Error fetching ${type} data:`, err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh
    const interval = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  };
}
