import { TrendingUp, Brain, History, Sparkles, ArrowRight, BarChart3 } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Live Market Data',
      description: 'Real-time tracking of stocks and cryptocurrencies',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Machine learning powered price forecasts',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      icon: History,
      title: 'Historical Events',
      description: 'Learn how major events shaped markets since WWI',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments in one place',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="size-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-auto">
      <div className="min-h-full flex flex-col items-center justify-between px-6 py-12">
        {/* Logo & Header */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-8 animate-pulse">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
              <TrendingUp size={64} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            ChainStock
          </h1>

          <p className="text-xl text-white/90 mb-12 max-w-md">
            Your intelligent companion for crypto and stock market analysis
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-md">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
                >
                  <div className={`${feature.bg} rounded-xl p-3 w-fit mb-3`}>
                    <Icon size={24} className={feature.color} />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/70">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8 text-white/90">
            <div className="text-center">
              <p className="text-2xl font-bold">1000+</p>
              <p className="text-xs">Assets</p>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold">AI</p>
              <p className="text-xs">Powered</p>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs">Live Data</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={onGetStarted}
            className="w-full bg-white text-purple-600 py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight size={24} />
          </button>

          <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
            <Sparkles size={14} />
            <span>Free to use • No signup required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
