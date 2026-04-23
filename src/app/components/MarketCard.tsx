import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
  onClick?: () => void;
}

export default function MarketCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  type,
  onClick,
}: MarketCardProps) {
  const isPositive = change >= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-98 transition-transform cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{symbol}</h3>
          <p className="text-sm text-gray-500">{name}</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
          {type === 'crypto' ? 'CRYPTO' : 'STOCK'}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="font-semibold">
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
