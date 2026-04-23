import { useState, useEffect } from 'react';
import PredictionCard from './PredictionCard';
import { Brain, Sparkles } from 'lucide-react';

interface Prediction {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
}

export default function Predictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const timeframes = ['24h', '7d', '30d'];

  // Mock ML predictions - In production, replace with actual ML model API
  const generatePredictions = (timeframe: string): Prediction[] => {
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

  useEffect(() => {
    setPredictions(generatePredictions(selectedTimeframe));

    // Update predictions every 10 seconds
    const interval = setInterval(() => {
      setPredictions(generatePredictions(selectedTimeframe));
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  return (
    <div className="pb-20 pt-4 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="text-purple-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">AI Predictions</h1>
        </div>
        <p className="text-sm text-gray-500">Machine learning powered market forecasts</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Sparkles className="text-purple-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">How it works</h3>
            <p className="text-sm text-gray-600">
              Our ML models analyze historical data, market sentiment, trading volumes, and global events to predict future price movements with confidence scores.
            </p>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mb-6">
        {timeframes.map(tf => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              selectedTimeframe === tf
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 active:scale-95'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Predictions List */}
      <div className="space-y-4">
        {predictions.map(prediction => (
          <PredictionCard key={prediction.symbol} {...prediction} />
        ))}
      </div>
    </div>
  );
}
