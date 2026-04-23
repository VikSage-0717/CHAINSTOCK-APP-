# API Integration Examples

This file provides examples of how to integrate real APIs into your React Native app.

## 🔌 Real API Integration Examples

### 1. Stock Data - Alpha Vantage

**Get API Key:** https://www.alphavantage.co/

```typescript
// src/utils/apiClient.ts
import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = process.env.EXPO_PUBLIC_ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const quote = response.data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent']),
      type: 'stock' as const,
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
```

**Usage in DashboardScreen:**
```typescript
useEffect(() => {
  const fetchAssets = async () => {
    try {
      const btcData = await fetchStockData('AAPL');
      const ethData = await fetchStockData('GOOGL');
      setAssets([btcData, ethData, ...]);
    } catch (error) {
      // Fallback to mock data
      setAssets(generateMockAssets());
    }
  };

  fetchAssets();
}, []);
```

### 2. Cryptocurrency Data - CoinGecko

**Get API:** https://www.coingecko.com/en/api

```typescript
// src/utils/cryptoAPI.ts
import axios from 'axios';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoAsset = async (cryptoId: string) => {
  try {
    const response = await axios.get(
      `${COINGECKO_BASE_URL}/simple/price`,
      {
        params: {
          ids: cryptoId,
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_vol: 'true',
          include_24hr_change: 'true',
        },
      }
    );

    const data = response.data[cryptoId];
    const symbolMap: Record<string, string> = {
      bitcoin: 'BTC',
      ethereum: 'ETH',
      solana: 'SOL',
    };

    return {
      symbol: symbolMap[cryptoId] || cryptoId,
      name: cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1),
      price: data.usd,
      changePercent: data.usd_24h_change,
      change: (data.usd * data.usd_24h_change) / 100,
      type: 'crypto' as const,
    };
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};

// Fetch multiple crypto assets
export const fetchMultipleCryptos = async (
  symbols: string[]
) => {
  try {
    const promises = symbols.map(symbol =>
      fetchCryptoAsset(symbol)
    );
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching multiple cryptos:', error);
    throw error;
  }
};
```

**Usage:**
```typescript
// In DashboardScreen.tsx
useEffect(() => {
  const loadAssets = async () => {
    try {
      const cryptoAssets = await fetchMultipleCryptos([
        'bitcoin',
        'ethereum',
        'solana',
      ]);
      const stockAssets = await fetchMultipleStocks([
        'AAPL',
        'GOOGL',
      ]);
      setAssets([...cryptoAssets, ...stockAssets]);
    } catch (error) {
      setAssets(generateMockAssets());
    }
  };

  loadAssets();
}, []);
```

### 3. Real-Time Data with WebSocket

```typescript
// src/utils/realtimeAPI.ts
import { Asset } from './mockData';

export class RealtimeDataClient {
  private ws: WebSocket | null = null;
  private callbacks: ((data: Asset) => void)[] = [];

  connect(symbols: string[]) {
    const socketUrl = `wss://stream.binance.com:9443/stream?streams=${symbols
      .map(s => `${s.toLowerCase()}usdt@ticker`)
      .join('/')}`;

    this.ws = new WebSocket(socketUrl);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const asset = this.parseTickerData(data.data);
      this.callbacks.forEach(cb => cb(asset));
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private parseTickerData(data: any): Asset {
    return {
      symbol: data.s.replace('USDT', ''),
      name: data.s,
      price: parseFloat(data.c),
      change: parseFloat(data.c) - parseFloat(data.o),
      changePercent:
        ((parseFloat(data.c) - parseFloat(data.o)) /
          parseFloat(data.o)) *
        100,
      type: 'crypto',
    };
  }

  subscribe(callback: (data: Asset) => void) {
    this.callbacks.push(callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Usage:
const realtimeClient = new RealtimeDataClient();

useEffect(() => {
  realtimeClient.connect(['BTC', 'ETH']);

  realtimeClient.subscribe((asset) => {
    setAssets(prev =>
      prev.map(a => (a.symbol === asset.symbol ? asset : a))
    );
  });

  return () => realtimeClient.disconnect();
}, []);
```

### 4. Historical Data - Finnhub

**Get API Key:** https://finnhub.io/

```typescript
// src/utils/historicalAPI.ts
import axios from 'axios';

const FINNHUB_API_KEY = process.env.EXPO_PUBLIC_FINNHUB_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchHistoricalPrices = async (
  symbol: string,
  days: number = 30
) => {
  try {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - days);

    const response = await axios.get(`${BASE_URL}/stock/candle`, {
      params: {
        symbol,
        resolution: 'D',
        from: Math.floor(fromDate.getTime() / 1000),
        to: Math.floor(toDate.getTime() / 1000),
        token: FINNHUB_API_KEY,
      },
    });

    return response.data.c.map((price: number, index: number) => ({
      date: new Date(
        response.data.t[index] * 1000
      ).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      price: price,
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};
```

**Usage in AssetDetailScreen:**
```typescript
useEffect(() => {
  const loadChartData = async () => {
    try {
      const data = await fetchHistoricalPrices(
        asset.symbol,
        30
      );
      setChartData(data);
    } catch (error) {
      setChartData(
        generateChartData(
          asset.price,
          asset.changePercent
        )
      );
    }
  };

  loadChartData();
}, [asset.symbol]);
```

### 5. ML Predictions - Custom Backend

```typescript
// src/utils/predictionAPI.ts
import axios from 'axios';

const PREDICTION_API_URL = process.env.EXPO_PUBLIC_PREDICTION_API;

export const fetchPredictions = async (
  symbol: string,
  timeframe: string
) => {
  try {
    const response = await axios.get(
      `${PREDICTION_API_URL}/predict`,
      {
        params: {
          symbol,
          timeframe,
        },
      }
    );

    return {
      symbol: response.data.symbol,
      currentPrice: response.data.current_price,
      predictedPrice: response.data.predicted_price,
      confidence: response.data.confidence,
      trend: response.data.trend,
      timeframe,
    };
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};
```

## 🔐 Environment Variables

Create `.env` file in project root:

```env
# Stock API
EXPO_PUBLIC_ALPHA_VANTAGE_KEY=your_api_key

# Crypto API
EXPO_PUBLIC_COINGECKO_KEY=your_api_key

# Financial Data
EXPO_PUBLIC_FINNHUB_KEY=your_api_key

# Custom Predictions
EXPO_PUBLIC_PREDICTION_API=https://your-api.com

# General Settings
EXPO_PUBLIC_API_TIMEOUT=10000
```

Access in code:
```typescript
const apiKey = process.env.EXPO_PUBLIC_ALPHA_VANTAGE_KEY;
```

## 📦 Install HTTP Client

For API calls, use axios (already included) or fetch:

```bash
npm install axios
```

## ⚡ Caching Strategy

```typescript
// src/utils/cache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export const getCachedData = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp } = JSON.parse(item);
    const isExpired =
      Date.now() - timestamp > CACHE_DURATION_MS;

    if (isExpired) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};

export const setCacheData = async (
  key: string,
  data: any
) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error('Cache write error:', error);
  }
};
```

**Usage:**
```typescript
const loadAssets = async () => {
  // Check cache first
  const cached = await getCachedData('assets');
  if (cached) {
    setAssets(cached);
    return;
  }

  // Fetch from API
  const fresh = await fetchAssetsFromAPI();
  setAssets(fresh);
  await setCacheData('assets', fresh);
};
```

## 🚀 Error Handling

```typescript
// src/utils/apiError.ts
export class APIError extends Error {
  constructor(
    public code: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    throw new APIError(
      error.response.status,
      error.response.data?.message || 'API Error'
    );
  } else if (error.request) {
    // Request made but no response
    throw new APIError(
      0,
      'No response from server. Check your connection.'
    );
  } else {
    // Error in request setup
    throw new APIError(-1, error.message || 'Unknown error');
  }
};
```

**Usage:**
```typescript
try {
  const assets = await fetchAssets();
  setAssets(assets);
} catch (error) {
  if (error instanceof APIError) {
    alert(`Error: ${error.message}`);
    // Fallback to mock data
    setAssets(generateMockAssets());
  }
}
```

## 🔄 Auto-Refresh Pattern

```typescript
const useAutoRefresh = (
  fetchFn: () => Promise<void>,
  interval: number = 30000 // 30 seconds
) => {
  useEffect(() => {
    // Fetch immediately
    fetchFn();

    // Then fetch at interval
    const timer = setInterval(fetchFn, interval);
    return () => clearInterval(timer);
  }, [fetchFn, interval]);
};

// Usage:
useAutoRefresh(
  async () => {
    const data = await fetchAssets();
    setAssets(data);
  },
  5000 // Update every 5 seconds
);
```

## 📊 Testing APIs

```bash
# Test API with curl
curl "https://api.example.com/assets?symbol=BTC"

# Or use Postman
# https://www.postman.com/

# Or use your browser's Network tab
```

---

**Next Steps:**
1. Choose your API providers
2. Sign up for API keys
3. Add keys to `.env`
4. Replace mock data with real API calls
5. Test thoroughly
6. Deploy! 🚀
