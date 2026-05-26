import { useState, useEffect } from 'react';
import { TrendingUp, Brain, History, Sparkles, ArrowRight, BarChart3, ChevronDown, RefreshCw } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerItems = [
    { symbol: 'BTC', price: '$67,432', change: '+2.4%' },
    { symbol: 'ETH', price: '$3,521', change: '+1.8%' },
    { symbol: 'AAPL', price: '$178.32', change: '+0.9%' },
    { symbol: 'NVDA', price: '$892.15', change: '+3.2%' },
    { symbol: 'TSLA', price: '$245.67', change: '-1.2%' },
  ];

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

  useEffect(() => {
    setIsVisible(true);
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 3000);
    return () => clearInterval(tickerInterval);
  }, []);

  return (
    <div className="size-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-auto">
      <div className="min-h-full flex flex-col items-center justify-between px-6 py-12">
        {/* Live Ticker */}
        <div className="w-full max-w-md">
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-white/70 animate-spin" />
                <span className="text-white/70 text-xs">Live Markets</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">Updated just now</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 overflow-hidden">
              <span
                key={tickerIndex}
                className="text-white font-bold text-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {tickerItems[tickerIndex].symbol}
              </span>
              <span className="text-white/80">{tickerItems[tickerIndex].price}</span>
              <span className={`text-sm font-medium ${tickerItems[tickerIndex].change.startsWith('+') ? 'text-green-300' : 'text-red-300'}`}>
                {tickerItems[tickerIndex].change}
              </span>
            </div>
          </div>
        </div>

        {/* Logo & Header */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div 
            className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl hover:scale-105 transition-transform cursor-default">
              <TrendingUp size={64} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h1 
            className={`text-5xl font-bold text-white mb-4 tracking-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
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
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 transition-all duration-300 cursor-pointer ${
                    hoveredFeature === index 
                      ? 'bg-white/20 scale-105 shadow-xl border-white/40' 
                      : 'hover:bg-white/15'
                  }`}
                >
                  <div className={`${feature.bg} rounded-xl p-3 w-fit mb-3 transition-transform ${hoveredFeature === index ? 'scale-110' : ''}`}>
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
            className="w-full bg-white text-purple-600 py-4 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            Get Started
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
            <Sparkles size={14} />
            <span>Free to use • No signup required</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 text-white/50 mt-4 animate-bounce">
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
}
