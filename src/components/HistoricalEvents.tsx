import { useState } from 'react';
import HistoricalEventCard from './HistoricalEventCard';
import { History, Filter } from 'lucide-react';

export default function HistoricalEvents() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'negative' | 'positive'>('all');

  const events = [
    {
      year: 1914,
      event: 'World War I Begins',
      description: 'The outbreak of WWI caused major stock exchanges to close for months. NYSE closed for 4 months.',
      marketImpact: 'Markets crashed globally. Dow Jones fell 30% before closure. Recovery took years.',
      impactType: 'negative' as const,
      percentChange: -30,
    },
    {
      year: 1929,
      event: 'The Great Depression',
      description: 'Black Tuesday marked the worst stock market crash in history, leading to a decade-long economic depression.',
      marketImpact: 'Dow Jones lost 89% of its value from peak to trough by 1932. Unemployment reached 25%.',
      impactType: 'negative' as const,
      percentChange: -89,
    },
    {
      year: 1939,
      event: 'World War II Begins',
      description: 'WWII outbreak initially caused market panic, but war production eventually boosted industrial stocks.',
      marketImpact: 'Initial 12% drop, followed by 157% gain from 1942-1945 due to war economy.',
      impactType: 'mixed' as const,
      percentChange: -12,
    },
    {
      year: 1973,
      event: 'Oil Crisis',
      description: 'OPEC oil embargo caused oil prices to quadruple, triggering a severe recession and stock market crash.',
      marketImpact: 'S&P 500 fell 48% from peak. Energy stocks volatile. Inflation reached double digits.',
      impactType: 'negative' as const,
      percentChange: -48,
    },
    {
      year: 1987,
      event: 'Black Monday',
      description: 'Largest single-day stock market crash in history. Dow Jones fell 22.6% in one day.',
      marketImpact: 'Global market panic. Circuit breakers implemented afterward. Recovery within 2 years.',
      impactType: 'negative' as const,
      percentChange: -22.6,
    },
    {
      year: 2000,
      event: 'Dot-com Bubble Burst',
      description: 'Technology stock bubble popped, wiping out trillions in market value as internet startups collapsed.',
      marketImpact: 'NASDAQ fell 78% from peak. Tech stocks devastated. Traditional economy less affected.',
      impactType: 'negative' as const,
      percentChange: -78,
    },
    {
      year: 2008,
      event: 'Global Financial Crisis',
      description: 'Housing bubble collapse and Lehman Brothers bankruptcy triggered worldwide banking crisis.',
      marketImpact: 'S&P 500 dropped 57%. Global credit freeze. Government bailouts required. Crypto emerged.',
      impactType: 'negative' as const,
      percentChange: -57,
    },
    {
      year: 2009,
      event: 'Bitcoin Launch',
      description: 'Satoshi Nakamoto launched Bitcoin, creating the first decentralized cryptocurrency.',
      marketImpact: 'Birth of crypto market. Initially dismissed, now trillion-dollar asset class.',
      impactType: 'positive' as const,
      percentChange: undefined,
    },
    {
      year: 2020,
      event: 'COVID-19 Pandemic',
      description: 'Global pandemic caused fastest market crash in history, followed by unprecedented stimulus and recovery.',
      marketImpact: '34% S&P crash in weeks, then historic bull run. Tech stocks soared. Crypto boomed.',
      impactType: 'mixed' as const,
      percentChange: -34,
    },
    {
      year: 2021,
      event: 'Crypto Bull Run',
      description: 'Bitcoin reached all-time high of $69k. NFT mania. DeFi explosion. Mainstream adoption accelerated.',
      marketImpact: 'Crypto market cap exceeded $3 trillion. Institutional adoption. El Salvador adopted Bitcoin.',
      impactType: 'positive' as const,
      percentChange: 300,
    },
    {
      year: 2022,
      event: 'Russia-Ukraine War & Inflation Crisis',
      description: 'Geopolitical conflict combined with highest inflation in 40 years caused market turmoil.',
      marketImpact: 'Stocks fell 25%. Crypto winter. Fed raised rates aggressively. Energy stocks surged.',
      impactType: 'negative' as const,
      percentChange: -25,
    },
    {
      year: 2024,
      event: 'AI Revolution',
      description: 'Artificial intelligence boom led by generative AI and machine learning breakthroughs.',
      marketImpact: 'Tech stocks soared. NVIDIA gained 200%+. AI startups reached trillion-dollar valuations.',
      impactType: 'positive' as const,
      percentChange: 45,
    },
  ];

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.impactType === selectedFilter;
  });

  return (
    <div className="pb-20 pt-4 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <History className="text-amber-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Historical Events</h1>
        </div>
        <p className="text-sm text-gray-500">How major events shaped financial markets</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto">
        <Filter size={18} className="text-gray-500 flex-shrink-0" />
        {[
          { id: 'all', label: 'All Events' },
          { id: 'negative', label: 'Crashes' },
          { id: 'positive', label: 'Bull Markets' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedFilter === filter.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 active:scale-95'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {filteredEvents.map((event, index) => (
          <HistoricalEventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
}
