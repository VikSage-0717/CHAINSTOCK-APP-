import { ArrowLeft, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface AssetDetailProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
  onBack: () => void;
}

export default function AssetDetail({
  symbol,
  name,
  price,
  change,
  changePercent,
  type,
  onBack,
}: AssetDetailProps) {
  const isPositive = change >= 0;

  // Mock historical data
  const generateChartData = (days: number) => {
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
        price: dayPrice,
      });
    }

    return data;
  };

  const chartData = generateChartData(30);

  const stats = [
    { label: '24h High', value: `$${(price * 1.05).toFixed(2)}` },
    { label: '24h Low', value: `$${(price * 0.95).toFixed(2)}` },
    { label: 'Market Cap', value: type === 'crypto' ? '$1.2T' : '$2.8T' },
    { label: 'Volume', value: '$45.2B' },
  ];

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Back</span>
        </button>
      </div>

      <div className="px-4 pt-6">
        {/* Asset Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{symbol}</h1>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {type === 'crypto' ? 'CRYPTO' : 'STOCK'}
            </span>
          </div>
          <p className="text-gray-500 mb-4">{name}</p>

          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </h2>
            <div className={`flex items-center gap-1 pb-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              <span className="text-xl font-semibold">
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-gray-500" />
            <span className="font-semibold text-gray-900">30 Day Price History</span>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-600 text-white py-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform">
            Buy
          </button>
          <button className="bg-red-600 text-white py-4 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
