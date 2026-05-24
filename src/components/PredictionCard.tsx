import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PredictionCardProps {
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: string;
  trend: 'bullish' | 'bearish' | 'neutral';
}

export default function PredictionCard({
  symbol,
  name,
  currentPrice,
  predictedPrice,
  confidence,
  timeframe,
  trend,
}: PredictionCardProps) {
  const change = ((predictedPrice - currentPrice) / currentPrice) * 100;

  const trendConfig = {
    bullish: { color: 'bg-green-50 border-green-200', icon: TrendingUp, iconColor: 'text-green-600' },
    bearish: { color: 'bg-red-50 border-red-200', icon: TrendingDown, iconColor: 'text-red-600' },
    neutral: { color: 'bg-gray-50 border-gray-200', icon: Minus, iconColor: 'text-gray-600' },
  };

  const config = trendConfig[trend];
  const TrendIcon = config.icon;

  return (
    <div className={`rounded-xl p-4 border ${config.color}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain size={18} className="text-purple-600" />
            <h3 className="font-semibold text-gray-900">{symbol}</h3>
          </div>
          <p className="text-sm text-gray-600">{name}</p>
        </div>

        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${config.iconColor} bg-white`}>
          <TrendIcon size={16} />
          <span className="text-xs font-semibold uppercase">{trend}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Current Price</p>
          <p className="font-semibold text-gray-900">${currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Predicted ({timeframe})</p>
          <p className="font-semibold text-gray-900">${predictedPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Expected Change</span>
          <span className={`font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Confidence</span>
            <span className="font-semibold text-gray-900">{confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
