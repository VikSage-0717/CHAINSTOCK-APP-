import { useState } from 'react';
import LandingPage from './components/LandingPage';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Predictions from './components/Predictions';
import HistoricalEvents from './components/HistoricalEvents';
import Portfolio from './components/Portfolio';
import AssetDetail from './components/AssetDetail';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'stock' | 'crypto';
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleBack = () => {
    setSelectedAsset(null);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (selectedAsset) {
    return (
      <div className="size-full bg-gray-50 overflow-auto">
        <AssetDetail {...selectedAsset} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="size-full bg-gray-50 overflow-auto">
      {activeTab === 'home' && <Dashboard onAssetClick={handleAssetClick} />}
      {activeTab === 'predictions' && <Predictions />}
      {activeTab === 'history' && <HistoricalEvents />}
      {activeTab === 'portfolio' && <Portfolio />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}