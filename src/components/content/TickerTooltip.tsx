import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { logger } from '@/lib/logger';

interface TickerTooltipProps {
  symbol: string;
  marketType?: string;
  children: React.ReactNode;
}

interface PriceData {
  price: number;
  changePercent: number;
  chartData?: Array<{ time: string; price: number }>;
}

export function TickerTooltip({ symbol, marketType = 'stocks', children }: TickerTooltipProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPrice = async () => {
    if (priceData) return; // Don't fetch if already loaded
    
    setLoading(true);
    setError(false);
    try {
      const { data, error: fetchError } = await supabase.functions.invoke('fetch-asset-price', {
        body: { symbol, marketType }
      });
      
      if (!fetchError && data) {
        setPriceData({
          price: data.price,
          changePercent: data.changePercent || 0,
          chartData: data.chartData || generateMockChartData(data.price),
        });
      } else {
        setError(true);
      }
    } catch (err) {
      logger.error('Error fetching ticker price:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const generateMockChartData = (currentPrice: number): Array<{ time: string; price: number }> => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: `${i * 5}m`,
      price: currentPrice * (1 + (Math.random() - 0.5) * 0.02),
    }));
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    }
    return `$${price.toFixed(4)}`;
  };

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip onOpenChange={(open) => open && !priceData && !loading && fetchPrice()}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="w-64 p-0" side="top" align="start">
          {loading ? (
            <div className="p-4 flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading price...</span>
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-muted-foreground">
              Failed to load price data
            </div>
          ) : priceData ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{symbol}</span>
                <span className={`flex items-center gap-1 text-xs ${
                  priceData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {priceData.changePercent >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {priceData.changePercent >= 0 ? '+' : ''}
                  {priceData.changePercent.toFixed(2)}%
                </span>
              </div>
              <div className="text-xl font-bold mb-3">
                {formatPrice(priceData.price)}
              </div>
              {priceData.chartData && priceData.chartData.length > 0 && (
                <div className="h-16 w-full -mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData.chartData}>
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={priceData.changePercent >= 0 ? '#22c55e' : '#ef4444'}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              Hover to load price
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

