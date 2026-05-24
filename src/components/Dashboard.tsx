import { useState, useEffect } from 'react';
import MarketCard from './MarketCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, Search } from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}

export default function Dashboard({ onAssetClick }: { onAssetClick: (asset: Asset) => void }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock market data - In production, replace with real API calls
  const generateMockData = (): Asset[] => {
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

  useEffect(() => {
    setAssets(generateMockData());

    // Simulate live updates every 5 seconds
    const interval = setInterval(() => {
      setAssets(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setAssets(generateMockData());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredAssets = assets.filter(asset =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock chart data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 65000 + Math.random() * 4000,
  }));

  return (
    <div className="pb-20 pt-4 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ChainStock</h1>
            <p className="text-sm text-gray-500">Real-time Market Analysis</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-3 bg-blue-600 text-white rounded-full shadow-lg active:scale-95 transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search stocks or crypto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Market Overview Chart */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 mb-6 shadow-lg">
        <h3 className="text-white font-semibold mb-2">Market Overview (24h)</h3>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#fff" opacity={0.5} tick={{ fontSize: 10 }} />
            <YAxis stroke="#fff" opacity={0.5} tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Market Cards */}
      <div className="space-y-3">
        <h2 className="font-semibold text-gray-900">Trending Assets</h2>
        {filteredAssets.map((asset) => (
          <MarketCard
            key={asset.symbol}
            {...asset}
            onClick={() => onAssetClick(asset)}
          />
        ))}
      </div>
    </div>
  );
}
