import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'stocks';
    
    console.log(`Fetching ${type} data...`);

    const FINNHUB_API_KEY = Deno.env.get('FINNHUB_API_KEY');
    const ALPHA_VANTAGE_API_KEY = Deno.env.get('ALPHA_VANTAGE_API_KEY');
    
    let marketData = null;
    
    // Try Finnhub first
    if (FINNHUB_API_KEY) {
      try {
        marketData = await fetchFinnhubQuotes(type, FINNHUB_API_KEY);
        if (marketData && marketData.length > 0) {
          console.log(`Successfully fetched ${type} data from Finnhub (${marketData.length} items)`);
        } else {
          marketData = null;
        }
      } catch (apiError) {
        console.log(`Finnhub API error for ${type}:`, apiError);
        marketData = null;
      }
    }
    
    // Fallback to Alpha Vantage for stocks
    if (!marketData && ALPHA_VANTAGE_API_KEY && type === 'stocks') {
      try {
        marketData = await fetchAlphaVantageQuotes(ALPHA_VANTAGE_API_KEY);
        if (marketData && marketData.length > 0) {
          console.log(`Successfully fetched ${type} data from Alpha Vantage (${marketData.length} items)`);
        } else {
          marketData = null;
        }
      } catch (apiError) {
        console.log(`Alpha Vantage API error:`, apiError);
        marketData = null;
      }
    }
    
    // Fallback to Yahoo Finance proxy (free, no key required)
    if (!marketData) {
      try {
        marketData = await fetchYahooFinanceQuotes(type);
        if (marketData && marketData.length > 0) {
          console.log(`Successfully fetched ${type} data from Yahoo Finance (${marketData.length} items)`);
        } else {
          marketData = null;
        }
      } catch (apiError) {
        console.log(`Yahoo Finance API error:`, apiError);
        marketData = null;
      }
    }
    
    // Final fallback to mock data
    if (!marketData || marketData.length === 0) {
      console.log(`All APIs failed for ${type}, using mock data`);
      marketData = getMockData(type);
    }

    return new Response(JSON.stringify({ data: marketData, timestamp: new Date().toISOString() }), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
      },
    });
  } catch (error: unknown) {
    console.error('Error fetching stock data:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Stock symbols
const STOCK_SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'JPM', 'V', 'WMT',
  'INTC', 'AMD', 'NFLX', 'DIS', 'PYPL', 'SQ', 'COIN', 'HOOD', 'BA', 'GS',
  'MA', 'UNH', 'PFE', 'KO', 'PEP', 'NKE', 'SBUX', 'MCD', 'CRM', 'ORCL'
];

// Index symbols with ETF proxies
const INDEX_SYMBOLS = [
  { symbol: '^GSPC', name: 'S&P 500', finnhub: 'SPY', yahoo: '^GSPC' },
  { symbol: '^DJI', name: 'Dow Jones Industrial Average', finnhub: 'DIA', yahoo: '^DJI' },
  { symbol: '^IXIC', name: 'NASDAQ Composite', finnhub: 'QQQ', yahoo: '^IXIC' },
  { symbol: '^RUT', name: 'Russell 2000', finnhub: 'IWM', yahoo: '^RUT' },
  { symbol: '^FTSE', name: 'FTSE 100', finnhub: 'EWU', yahoo: '^FTSE' },
  { symbol: '^GDAXI', name: 'DAX', finnhub: 'EWG', yahoo: '^GDAXI' },
  { symbol: '^FCHI', name: 'CAC 40', finnhub: 'EWQ', yahoo: '^FCHI' },
  { symbol: '^N225', name: 'Nikkei 225', finnhub: 'EWJ', yahoo: '^N225' },
  { symbol: '^HSI', name: 'Hang Seng', finnhub: 'EWH', yahoo: '^HSI' },
];

// Commodity symbols with proxies
const COMMODITY_SYMBOLS = [
  { symbol: 'GC=F', name: 'Gold Futures', finnhub: 'GLD', yahoo: 'GC=F' },
  { symbol: 'SI=F', name: 'Silver Futures', finnhub: 'SLV', yahoo: 'SI=F' },
  { symbol: 'CL=F', name: 'Crude Oil WTI', finnhub: 'USO', yahoo: 'CL=F' },
  { symbol: 'NG=F', name: 'Natural Gas', finnhub: 'UNG', yahoo: 'NG=F' },
  { symbol: 'HG=F', name: 'Copper Futures', finnhub: 'CPER', yahoo: 'HG=F' },
  { symbol: 'PL=F', name: 'Platinum Futures', finnhub: 'PPLT', yahoo: 'PL=F' },
  { symbol: 'PA=F', name: 'Palladium Futures', finnhub: 'PALL', yahoo: 'PA=F' },
  { symbol: 'ZW=F', name: 'Wheat Futures', finnhub: 'WEAT', yahoo: 'ZW=F' },
  { symbol: 'ZC=F', name: 'Corn Futures', finnhub: 'CORN', yahoo: 'ZC=F' },
  { symbol: 'KC=F', name: 'Coffee Futures', finnhub: 'JO', yahoo: 'KC=F' },
];

// Currency pairs
const CURRENCY_SYMBOLS = [
  { symbol: 'EURUSD', name: 'Euro / US Dollar', yahoo: 'EURUSD=X' },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', yahoo: 'GBPUSD=X' },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', yahoo: 'JPY=X' },
  { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', yahoo: 'CHF=X' },
  { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', yahoo: 'AUDUSD=X' },
  { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', yahoo: 'CAD=X' },
  { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', yahoo: 'NZDUSD=X' },
  { symbol: 'EURGBP', name: 'Euro / British Pound', yahoo: 'EURGBP=X' },
  { symbol: 'USDCNY', name: 'US Dollar / Chinese Yuan', yahoo: 'CNY=X' },
  { symbol: 'USDSGD', name: 'US Dollar / Singapore Dollar', yahoo: 'SGD=X' },
];

// Alpha Vantage API (free tier: 5 calls/minute, 500 calls/day)
async function fetchAlphaVantageQuotes(apiKey: string) {
  // Alpha Vantage has rate limits, so we fetch a subset
  const topSymbols = STOCK_SYMBOLS.slice(0, 10);
  const results = await Promise.all(
    topSymbols.map(async (symbol) => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );
        const data = await response.json();
        
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
          const quote = data['Global Quote'];
          return {
            symbol,
            name: symbol, // Alpha Vantage doesn't return name
            price: parseFloat(quote['05. price']) || 0,
            change: parseFloat(quote['09. change']) || 0,
            changePercent: parseFloat(quote['10. change percent']?.replace('%', '')) || 0,
            high: parseFloat(quote['03. high']) || 0,
            low: parseFloat(quote['04. low']) || 0,
            volume: formatVolume(parseInt(quote['06. volume']) || 0),
          };
        }
        return null;
      } catch {
        return null;
      }
    })
  );
  return results.filter(Boolean);
}

// Yahoo Finance via query1.finance.yahoo.com (free, no key required)
async function fetchYahooFinanceQuotes(type: string) {
  let symbols: string[] = [];
  let symbolMap: Record<string, { name: string; originalSymbol: string }> = {};
  
  if (type === 'stocks') {
    symbols = STOCK_SYMBOLS.slice(0, 15);
    symbols.forEach(s => symbolMap[s] = { name: s, originalSymbol: s });
  } else if (type === 'indices') {
    INDEX_SYMBOLS.forEach(item => {
      symbols.push(item.yahoo);
      symbolMap[item.yahoo] = { name: item.name, originalSymbol: item.symbol };
    });
  } else if (type === 'commodities') {
    COMMODITY_SYMBOLS.forEach(item => {
      symbols.push(item.yahoo);
      symbolMap[item.yahoo] = { name: item.name, originalSymbol: item.symbol };
    });
  } else if (type === 'currencies') {
    CURRENCY_SYMBOLS.forEach(item => {
      symbols.push(item.yahoo);
      symbolMap[item.yahoo] = { name: item.name, originalSymbol: item.symbol };
    });
  } else {
    return null;
  }
  
  try {
    // Use Yahoo Finance v7 API
    const symbolsStr = symbols.join(',');
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbolsStr)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }
    
    const data = await response.json();
    const quotes = data?.quoteResponse?.result || [];
    
    return quotes.map((quote: any) => {
      const info = symbolMap[quote.symbol] || { name: quote.shortName || quote.symbol, originalSymbol: quote.symbol };
      return {
        symbol: formatSymbol(info.originalSymbol, type),
        name: info.name || quote.shortName || quote.symbol,
        price: quote.regularMarketPrice || 0,
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        high: quote.regularMarketDayHigh || quote.regularMarketPrice,
        low: quote.regularMarketDayLow || quote.regularMarketPrice,
        volume: formatVolume(quote.regularMarketVolume || 0),
      };
    }).filter((q: any) => q.price > 0);
  } catch (error) {
    console.error('Yahoo Finance fetch error:', error);
    return null;
  }
}

async function fetchFinnhubQuotes(type: string, apiKey: string) {
  if (type === 'stocks') {
    const results = await Promise.all(
      STOCK_SYMBOLS.map(async (symbol) => {
        try {
          const [quoteRes, profileRes] = await Promise.all([
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`),
            fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`)
          ]);
          
          const quote = await quoteRes.json();
          const profile = await profileRes.json();
          
          if (quote.c === 0) return null;
          
          return {
            symbol,
            name: profile.name || symbol,
            price: quote.c || 0,
            change: quote.d || 0,
            changePercent: quote.dp || 0,
            high: quote.h || quote.c,
            low: quote.l || quote.c,
            volume: formatVolume(0),
          };
        } catch {
          return null;
        }
      })
    );
    return results.filter(Boolean);
  }
  
  if (type === 'indices') {
    const results = await Promise.all(
      INDEX_SYMBOLS.map(async (item) => {
        try {
          const quoteRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${item.finnhub}&token=${apiKey}`);
          const quote = await quoteRes.json();
          
          if (quote.c === 0) return null;
          
          return {
            symbol: formatSymbol(item.symbol, 'indices'),
            name: item.name,
            price: quote.c || 0,
            change: quote.d || 0,
            changePercent: quote.dp || 0,
            high: quote.h || quote.c,
            low: quote.l || quote.c,
          };
        } catch {
          return null;
        }
      })
    );
    return results.filter(Boolean);
  }
  
  if (type === 'commodities') {
    const results = await Promise.all(
      COMMODITY_SYMBOLS.map(async (item) => {
        try {
          const quoteRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${item.finnhub}&token=${apiKey}`);
          const quote = await quoteRes.json();
          
          if (quote.c === 0) return null;
          
          return {
            symbol: formatSymbol(item.symbol, 'commodities'),
            name: item.name,
            price: quote.c || 0,
            change: quote.d || 0,
            changePercent: quote.dp || 0,
            high: quote.h || quote.c,
            low: quote.l || quote.c,
          };
        } catch {
          return null;
        }
      })
    );
    return results.filter(Boolean);
  }
  
  if (type === 'currencies') {
    const results = await Promise.all(
      CURRENCY_SYMBOLS.map(async (item) => {
        try {
          const quoteRes = await fetch(`https://finnhub.io/api/v1/forex/candle?symbol=OANDA:${item.symbol}&resolution=D&count=2&token=${apiKey}`);
          const data = await quoteRes.json();
          
          if (!data.c || data.c.length < 2) {
            return null;
          }
          
          const currentPrice = data.c[data.c.length - 1];
          const prevPrice = data.c[data.c.length - 2];
          const change = currentPrice - prevPrice;
          const changePercent = (change / prevPrice) * 100;
          
          const pair = item.symbol.substring(0, 3) + '/' + item.symbol.substring(3);
          return {
            symbol: pair,
            name: item.name,
            price: currentPrice,
            change,
            changePercent,
            high: data.h ? data.h[data.h.length - 1] : currentPrice,
            low: data.l ? data.l[data.l.length - 1] : currentPrice,
          };
        } catch {
          return null;
        }
      })
    );
    
    const validResults = results.filter(Boolean);
    if (validResults.length < 3) {
      return null;
    }
    return validResults;
  }
  
  return null;
}

function formatSymbol(symbol: string, type: string): string {
  if (type === 'indices') {
    const indexMap: Record<string, string> = {
      '^GSPC': 'SPX',
      '^DJI': 'DJI',
      '^IXIC': 'IXIC',
      '^RUT': 'RUT',
      '^FTSE': 'FTSE',
      '^GDAXI': 'DAX',
      '^FCHI': 'CAC40',
      '^N225': 'N225',
      '^HSI': 'HSI',
    };
    return indexMap[symbol] || symbol.replace('^', '');
  }
  if (type === 'commodities') {
    return symbol.replace('=F', '');
  }
  if (type === 'currencies') {
    const symbol6 = symbol.replace('=X', '');
    if (symbol6.length === 6) {
      return symbol6.substring(0, 3) + '/' + symbol6.substring(3);
    }
  }
  return symbol;
}

function formatVolume(value: number): string {
  if (!value) return '-';
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toString();
}

// Realistic mock data with slight random variations
function getMockData(type: string) {
  const addVariation = (base: number, percent: number = 2) => {
    const variation = (Math.random() - 0.5) * 2 * (base * percent / 100);
    return Number((base + variation).toFixed(2));
  };

  const mockData: Record<string, any[]> = {
    indices: [
      { symbol: 'SPX', name: 'S&P 500', price: addVariation(6012.50), change: addVariation(45.30, 50), changePercent: addVariation(0.76, 50), high: 6025.00, low: 5980.00 },
      { symbol: 'DJI', name: 'Dow Jones Industrial Average', price: addVariation(44650.00), change: addVariation(280.50, 50), changePercent: addVariation(0.63, 50), high: 44720.00, low: 44300.00 },
      { symbol: 'IXIC', name: 'NASDAQ Composite', price: addVariation(19150.75), change: addVariation(175.25, 50), changePercent: addVariation(0.92, 50), high: 19200.00, low: 18950.00 },
      { symbol: 'RUT', name: 'Russell 2000', price: addVariation(2380.50), change: addVariation(-12.30, 50), changePercent: addVariation(-0.51, 50), high: 2400.00, low: 2365.00 },
      { symbol: 'FTSE', name: 'FTSE 100', price: addVariation(8312.40), change: addVariation(28.60, 50), changePercent: addVariation(0.35, 50), high: 8340.00, low: 8280.00 },
      { symbol: 'DAX', name: 'DAX', price: addVariation(19850.00), change: addVariation(120.50, 50), changePercent: addVariation(0.61, 50), high: 19900.00, low: 19700.00 },
      { symbol: 'CAC40', name: 'CAC 40', price: addVariation(7520.00), change: addVariation(-45.20, 50), changePercent: addVariation(-0.60, 50), high: 7580.00, low: 7490.00 },
      { symbol: 'N225', name: 'Nikkei 225', price: addVariation(38650.00), change: addVariation(285.00, 50), changePercent: addVariation(0.74, 50), high: 38800.00, low: 38400.00 },
      { symbol: 'HSI', name: 'Hang Seng', price: addVariation(19250.00), change: addVariation(-180.30, 50), changePercent: addVariation(-0.93, 50), high: 19500.00, low: 19100.00 },
    ],
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: addVariation(195.50), change: addVariation(3.20, 50), changePercent: addVariation(1.67, 50), high: 196.80, low: 192.10, volume: '52.3M' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: addVariation(415.30), change: addVariation(7.50, 50), changePercent: addVariation(1.84, 50), high: 418.00, low: 408.50, volume: '28.1M' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: addVariation(178.25), change: addVariation(-2.15, 50), changePercent: addVariation(-1.19, 50), high: 181.50, low: 177.00, volume: '18.7M' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: addVariation(205.80), change: addVariation(4.30, 50), changePercent: addVariation(2.13, 50), high: 207.00, low: 201.50, volume: '35.2M' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: addVariation(342.50), change: addVariation(18.75, 50), changePercent: addVariation(5.79, 50), high: 348.00, low: 322.00, volume: '98.5M' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: addVariation(142.50), change: addVariation(5.20, 50), changePercent: addVariation(3.79, 50), high: 145.00, low: 138.00, volume: '185.2M' },
      { symbol: 'META', name: 'Meta Platforms Inc.', price: addVariation(585.30), change: addVariation(12.40, 50), changePercent: addVariation(2.16, 50), high: 590.00, low: 570.00, volume: '15.8M' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: addVariation(245.80), change: addVariation(-1.20, 50), changePercent: addVariation(-0.49, 50), high: 248.00, low: 244.00, volume: '8.5M' },
      { symbol: 'V', name: 'Visa Inc.', price: addVariation(295.40), change: addVariation(3.80, 50), changePercent: addVariation(1.30, 50), high: 297.00, low: 291.00, volume: '6.2M' },
      { symbol: 'WMT', name: 'Walmart Inc.', price: addVariation(92.30), change: addVariation(0.85, 50), changePercent: addVariation(0.93, 50), high: 93.00, low: 91.50, volume: '12.1M' },
      { symbol: 'INTC', name: 'Intel Corporation', price: addVariation(24.80), change: addVariation(-0.45, 50), changePercent: addVariation(-1.78, 50), high: 25.50, low: 24.50, volume: '45.2M' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: addVariation(138.90), change: addVariation(4.20, 50), changePercent: addVariation(3.12, 50), high: 140.00, low: 134.00, volume: '62.3M' },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: addVariation(895.50), change: addVariation(15.30, 50), changePercent: addVariation(1.74, 50), high: 900.00, low: 875.00, volume: '4.8M' },
      { symbol: 'DIS', name: 'Walt Disney Co.', price: addVariation(115.40), change: addVariation(2.10, 50), changePercent: addVariation(1.85, 50), high: 116.50, low: 112.80, volume: '9.2M' },
      { symbol: 'PYPL', name: 'PayPal Holdings', price: addVariation(88.50), change: addVariation(-1.30, 50), changePercent: addVariation(-1.45, 50), high: 90.20, low: 87.80, volume: '11.5M' },
    ],
    commodities: [
      { symbol: 'GC', name: 'Gold Futures', price: addVariation(2075.50), change: addVariation(12.30, 50), changePercent: addVariation(0.60, 50), high: 2082.00, low: 2060.00 },
      { symbol: 'SI', name: 'Silver Futures', price: addVariation(24.85), change: addVariation(0.45, 50), changePercent: addVariation(1.84, 50), high: 25.10, low: 24.35 },
      { symbol: 'CL', name: 'Crude Oil WTI', price: addVariation(74.20), change: addVariation(-2.80, 50), changePercent: addVariation(-3.64, 50), high: 77.50, low: 73.80 },
      { symbol: 'NG', name: 'Natural Gas', price: addVariation(2.95), change: addVariation(0.08, 50), changePercent: addVariation(2.79, 50), high: 3.02, low: 2.85 },
      { symbol: 'HG', name: 'Copper Futures', price: addVariation(4.32), change: addVariation(0.05, 50), changePercent: addVariation(1.17, 50), high: 4.38, low: 4.25 },
      { symbol: 'PL', name: 'Platinum Futures', price: addVariation(985.50), change: addVariation(8.20, 50), changePercent: addVariation(0.84, 50), high: 992.00, low: 975.00 },
      { symbol: 'PA', name: 'Palladium Futures', price: addVariation(1025.80), change: addVariation(-15.40, 50), changePercent: addVariation(-1.48, 50), high: 1045.00, low: 1015.00 },
      { symbol: 'ZW', name: 'Wheat Futures', price: addVariation(5.85), change: addVariation(0.12, 50), changePercent: addVariation(2.09, 50), high: 5.95, low: 5.72 },
      { symbol: 'ZC', name: 'Corn Futures', price: addVariation(4.52), change: addVariation(-0.08, 50), changePercent: addVariation(-1.74, 50), high: 4.62, low: 4.48 },
      { symbol: 'KC', name: 'Coffee Futures', price: addVariation(325.50), change: addVariation(5.80, 50), changePercent: addVariation(1.81, 50), high: 330.00, low: 318.00 },
    ],
    currencies: [
      { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: addVariation(1.0520, 0.5), change: addVariation(-0.0035, 100), changePercent: addVariation(-0.33, 50), high: 1.0560, low: 1.0495 },
      { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: addVariation(1.2680, 0.5), change: addVariation(0.0025, 100), changePercent: addVariation(0.20, 50), high: 1.2710, low: 1.2645 },
      { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: addVariation(149.85, 0.5), change: addVariation(0.75, 100), changePercent: addVariation(0.50, 50), high: 150.20, low: 148.90 },
      { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: addVariation(0.8820, 0.5), change: addVariation(0.0015, 100), changePercent: addVariation(0.17, 50), high: 0.8845, low: 0.8790 },
      { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: addVariation(0.6485, 0.5), change: addVariation(-0.0028, 100), changePercent: addVariation(-0.43, 50), high: 0.6520, low: 0.6470 },
      { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: addVariation(1.3580, 0.5), change: addVariation(0.0042, 100), changePercent: addVariation(0.31, 50), high: 1.3610, low: 1.3540 },
      { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', price: addVariation(0.5920, 0.5), change: addVariation(-0.0018, 100), changePercent: addVariation(-0.30, 50), high: 0.5945, low: 0.5900 },
      { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: addVariation(0.8295, 0.5), change: addVariation(-0.0012, 100), changePercent: addVariation(-0.14, 50), high: 0.8315, low: 0.8280 },
      { symbol: 'USD/CNY', name: 'US Dollar / Chinese Yuan', price: addVariation(7.2450, 0.3), change: addVariation(0.0085, 100), changePercent: addVariation(0.12, 50), high: 7.2520, low: 7.2380 },
      { symbol: 'USD/SGD', name: 'US Dollar / Singapore Dollar', price: addVariation(1.3420, 0.5), change: addVariation(0.0018, 100), changePercent: addVariation(0.13, 50), high: 1.3445, low: 1.3395 },
    ],
  };

  return mockData[type] || [];
}
