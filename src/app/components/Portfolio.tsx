import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function Portfolio() {
  const portfolioData = [
    { name: 'Bitcoin', value: 45000, percentage: 40, color: '#f7931a' },
    { name: 'Ethereum', value: 28000, percentage: 25, color: '#627eea' },
    { name: 'Stocks', value: 22000, percentage: 20, color: '#10b981' },
    { name: 'Altcoins', value: 11000, percentage: 10, color: '#8b5cf6' },
    { name: 'Cash', value: 5600, percentage: 5, color: '#6b7280' },
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalGain = 15420;
  const totalGainPercent = 15.8;

  const holdings = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.67, value: 45000, change: 12.4, isPositive: true },
    { symbol: 'ETH', name: 'Ethereum', amount: 8.75, value: 28000, change: 8.2, isPositive: true },
    { symbol: 'AAPL', name: 'Apple', amount: 125, value: 22000, change: -2.3, isPositive: false },
    { symbol: 'SOL', name: 'Solana', amount: 75, value: 11000, change: 18.7, isPositive: true },
  ];

  return (
    <div className="pb-20 pt-4 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        </div>
        <p className="text-sm text-gray-500">Track your investments</p>
      </div>

      {/* Total Value Card */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 mb-6 shadow-lg text-white">
        <p className="text-sm opacity-90 mb-1">Total Portfolio Value</p>
        <h2 className="text-4xl font-bold mb-4">
          ${totalValue.toLocaleString()}
        </h2>

        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 w-fit">
          <TrendingUp size={20} />
          <span className="font-semibold">
            +${totalGain.toLocaleString()} ({totalGainPercent}%)
          </span>
        </div>
      </div>

      {/* Allocation Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Asset Allocation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percentage }) => `${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {portfolioData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Your Holdings</h3>
        {holdings.map((holding, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{holding.symbol}</h4>
                <p className="text-sm text-gray-500">{holding.name}</p>
              </div>
              <div className={`flex items-center gap-1 ${holding.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {holding.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="font-semibold">
                  {holding.isPositive ? '+' : ''}{holding.change}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{holding.amount} units</span>
              <span className="font-semibold text-gray-900">
                ${holding.value.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
