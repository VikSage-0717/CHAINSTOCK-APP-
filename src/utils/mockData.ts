import { getMarketEvents } from './marketEvents';

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}


export interface Prediction {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
}

export interface HistoricalEvent {
  year: number;
  event: string;
  description: string;
  marketImpact: string;
  impactType: 'negative' | 'positive' | 'mixed';
  percentChange?: number;
}

export const generateMockAssets = (): Asset[] => {
  const baseAssets = [
    { symbol: 'BTC', name: 'Bitcoin', base: 67000, type: 'crypto' as const },
    { symbol: 'ETH', name: 'Ethereum', base: 3200, type: 'crypto' as const },
    { symbol: 'AAPL', name: 'Apple Inc.', base: 178, type: 'stock' as const },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', base: 142, type: 'stock' as const },
    { symbol: 'TSLA', name: 'Tesla Inc.', base: 248, type: 'stock' as const },
    { symbol: 'MSFT', name: 'Microsoft Corp.', base: 418, type: 'stock' as const },
    { symbol: 'SOL', name: 'Solana', base: 145, type: 'crypto' as const },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', base: 186, type: 'stock' as const },
  ];

  return baseAssets.map(asset => {
    const randomChange = (Math.random() - 0.5) * 10;
    const changePercent = randomChange;
    const price = asset.base * (1 + changePercent / 100);
    return {
      ...asset,
      price,
      change: price - asset.base,
      changePercent,
    };
  });
};

export const generatePredictions = (timeframe: string): Prediction[] => {
  const baseAssets = [
    { symbol: 'BTC', name: 'Bitcoin', currentPrice: 67234.50 },
    { symbol: 'ETH', name: 'Ethereum', currentPrice: 3198.75 },
    { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 178.42 },
    { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 248.87 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', currentPrice: 142.15 },
    { symbol: 'SOL', name: 'Solana', currentPrice: 145.32 },
  ];

  const timeframeMultiplier = {
    '24h': 0.03,
    '7d': 0.08,
    '30d': 0.15,
  }[timeframe] || 0.03;

  return baseAssets.map(asset => {
    const randomFactor = (Math.random() - 0.45) * timeframeMultiplier;
    const predictedPrice = asset.currentPrice * (1 + randomFactor);
    const confidence = Math.floor(65 + Math.random() * 30);

    let trend: 'bullish' | 'bearish' | 'neutral';
    if (predictedPrice > asset.currentPrice * 1.02) trend = 'bullish';
    else if (predictedPrice < asset.currentPrice * 0.98) trend = 'bearish';
    else trend = 'neutral';

    return {
      ...asset,
      predictedPrice,
      confidence,
      timeframe,
      trend,
    };
  });
};

export const generateChartData = (price: number, changePercent: number, days: number = 30) => {
  const data = [];
  const basePrice = price / (1 + changePercent / 100);

  for (let i = days; i >= 0; i--) {
    const randomVariation = (Math.random() - 0.5) * 0.1;
    const dayPrice = basePrice * (1 + randomVariation) * (1 + (changePercent * (days - i)) / (days * 100));

    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      price: Math.round(dayPrice * 100) / 100,
    });
  }

  return data;
};


export const getHistoricalEvents = (): HistoricalEvent[] => {
  // Use verified market events
  const marketEvents = getMarketEvents();
  
  return marketEvents.map(event => ({
    year: event.year,
    event: event.event,
    description: event.description,
    marketImpact: event.marketImpact,
    impactType: event.impactType,
    percentChange: event.priceImpact,
  }));
};

