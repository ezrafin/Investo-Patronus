import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MarketData } from '@/lib/api/types';
import { fetchMarketData } from '@/lib/api/market';
import { logger } from '@/lib/logger';

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
  isDemo: boolean;
  isRefreshing: boolean;
}

// Map market types to database market_type values
const marketTypeMap: Record<string, string> = {
  crypto: 'crypto',
  stocks: 'stocks',
  indices: 'indices',
  commodities: 'commodities',
  currencies: 'currencies',
};

// Load cached prices from database first (fast)
async function loadCachedPrices(type: string): Promise<MarketData[]> {
  try {
    const { data, error } = await supabase
      .from('market_prices')
      .select('*')
      .eq('market_type', marketTypeMap[type] || type)
      .order('updated_at', { ascending: false });

    if (error || !data) return [];

    return data.map(item => ({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      change: item.change ?? 0,
      changePercent: item.change_percent ?? 0,
      high: item.high ?? 0,
      low: item.low ?? 0,
      volume: item.volume ?? undefined,
    }));
  } catch (err) {
    logger.error('Error loading cached prices:', err);
    return [];
  }
}

export function useMarketData({ type, refreshInterval = 120000 }: UseMarketDataOptions): UseMarketDataReturn {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchFreshData = useCallback(async () => {
    try {
      setError(null);
      
      if (type === 'crypto') {
        const { data: responseData, error: fetchError } = await supabase.functions.invoke('fetch-crypto');
        
        if (fetchError) throw fetchError;

        if (responseData?.data && responseData.data.length > 0) {
          setData(responseData.data);
          setLastUpdated(new Date(responseData.timestamp));
          setIsDemo(false);
          return;
        }
      } else {
        // For non-crypto types, use fetch-stocks with type parameter
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase configuration missing');
        }
        
        const response = await fetch(
          `${supabaseUrl}/functions/v1/fetch-stocks?type=${type}`,
          {
            headers: {
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch ${type} data: ${response.status} ${errorText}`);
        }
        
        const result = await response.json();
        if (result?.data) {
          setData(result.data);
          setLastUpdated(new Date(result.timestamp));
          setIsDemo(false);
          return;
        } else if (result?.error) {
          throw new Error(result.error);
        }
      }
      
      // If we get here, API returned no data - fallback to mock
      const fallback = await fetchMarketData(type as 'crypto');
      setData(fallback);
      setLastUpdated(new Date());
      setIsDemo(true);
    } catch (err) {
      logger.error(`Error fetching fresh ${type} data:`, err);
      // Don't set error if we already have cached data
      if (data.length === 0) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      }
    }
  }, [type, data.length]);

  const fetchData = useCallback(async () => {
    // Step 1: Load cached data from DB first (instant)
    const cachedData = await loadCachedPrices(type);
    
    if (cachedData.length > 0) {
      setData(cachedData);
      setLoading(false);
      setIsDemo(false);
      
      // Get last update time from cache
      const { data: latestPrice } = await supabase
        .from('market_prices')
        .select('updated_at')
        .eq('market_type', marketTypeMap[type] || type)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (latestPrice?.updated_at) {
        setLastUpdated(new Date(latestPrice.updated_at));
      }
    }
    
    // Step 2: Fetch fresh data in background
    setIsRefreshing(true);
    await fetchFreshData();
    setIsRefreshing(false);
    setLoading(false);
  }, [type, fetchFreshData]);

  useEffect(() => {
    // Reset state when type changes
    hasFetchedRef.current = false;
    setLoading(true);
    setData([]);
    
    fetchData();
    
    // Set up auto-refresh
    const interval = setInterval(() => {
      setIsRefreshing(true);
      fetchFreshData().finally(() => setIsRefreshing(false));
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, fetchFreshData, refreshInterval, type]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
    isDemo,
    isRefreshing,
  };
}
