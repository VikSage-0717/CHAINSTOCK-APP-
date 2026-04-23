import { Calendar, TrendingDown, TrendingUp } from 'lucide-react';

interface HistoricalEventCardProps {
  year: number;
  event: string;
  description: string;
  marketImpact: string;
  impactType: 'negative' | 'positive' | 'mixed';
  percentChange?: number;
}

export default function HistoricalEventCard({
  year,
  event,
  description,
  marketImpact,
  impactType,
  percentChange,
}: HistoricalEventCardProps) {
  const impactColors = {
    negative: 'border-l-red-500 bg-red-50',
    positive: 'border-l-green-500 bg-green-50',
    mixed: 'border-l-yellow-500 bg-yellow-50',
  };

  return (
    <div className={`border-l-4 ${impactColors[impactType]} rounded-r-xl p-4 mb-3`}>
      <div className="flex items-start gap-3">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <Calendar size={20} className="text-gray-700" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900">{year}</span>
            {percentChange !== undefined && (
              <span className={`flex items-center gap-1 text-sm font-semibold ${
                percentChange < 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {percentChange < 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                {percentChange >= 0 ? '+' : ''}{percentChange}%
              </span>
            )}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">{event}</h4>

          <p className="text-sm text-gray-700 mb-2">{description}</p>

          <div className="bg-white rounded-lg p-2 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Market Impact:</p>
            <p className="text-sm text-gray-900">{marketImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
