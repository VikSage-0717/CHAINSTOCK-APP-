import { Asset } from './mockData';

// CoinGecko API for crypto data (free, no key required)
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

// Default assets - Global & Indian markets
const DEFAULT_ASSETS: Asset[] = [
  // Crypto Assets
  { symbol: 'BTC', name: 'Bitcoin', price: 0, change: 0, changePercent: 0, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 0, change: 0, changePercent: 0, type: 'crypto' },
  { symbol: 'SOL', name: 'Solana', price: 0, change: 0, changePercent: 0, type: 'crypto' },

  // Global Tech Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', price: 0, change: 0, changePercent: 0, type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 0, change: 0, changePercent: 0, type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 0, change: 0, changePercent: 0, type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 0, change: 0, changePercent: 0, type: 'stock' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 0, change: 0, changePercent: 0, type: 'stock' },

  // Indian Market - Stocks
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3050, change: 45, changePercent: 1.5, type: 'stock' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3720, change: 55, changePercent: 1.5, type: 'stock' },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1710, change: 25, changePercent: 1.5, type: 'stock' },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 520, change: 8, changePercent: 1.6, type: 'stock' },
  { symbol: 'HDFC', name: 'HDFC Bank', price: 1670, change: 20, changePercent: 1.2, type: 'stock' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1060, change: 15, changePercent: 1.4, type: 'stock' },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 1150, change: 18, changePercent: 1.6, type: 'stock' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 10200, change: 150, changePercent: 1.5, type: 'stock' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 815, change: 12, changePercent: 1.5, type: 'stock' },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', price: 2040, change: 30, changePercent: 1.5, type: 'stock' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1150, change: 17, changePercent: 1.5, type: 'stock' },
  { symbol: 'ITC', name: 'ITC Limited', price: 445, change: 6, changePercent: 1.4, type: 'stock' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 780, change: 11, changePercent: 1.4, type: 'stock' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 10900, change: 160, changePercent: 1.5, type: 'stock' },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1680, change: 25, changePercent: 1.5, type: 'stock' },

  // Other Global Markets
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3350, change: 50, changePercent: 1.5, type: 'stock' },
  { symbol: 'NESTLEIND', name: 'Nestlé India', price: 2480, change: 37, changePercent: 1.5, type: 'stock' },
];

// Fetch crypto prices from CoinGecko
export const getCryptoPrices = async (ids: string[]): Promise<any> => {
  try {
    const idList = ids.join(',');
    const response = await fetch(
      `${COINGECKO_URL}/simple/price?ids=${idList}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );
    if (!response.ok) throw new Error('Failed to fetch crypto prices');
    return await response.json();
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return null;
  }
};

export const getDashboardAssets = async (): Promise<Asset[]> => {
  try {
    // Fetch crypto data - pass as array
    const cryptoData = await getCryptoPrices(['bitcoin', 'ethereum', 'solana']);
    
    const assets: Asset[] = [];

    // Add crypto assets with real data
    if (cryptoData) {
      if (cryptoData.bitcoin) {
        const btcPrice = cryptoData.bitcoin.usd;
        const btcChange = cryptoData.bitcoin.usd_24h_change || 0;
        assets.push({
          symbol: 'BTC',
          name: 'Bitcoin',
          price: btcPrice || 67000,
          change: btcPrice ? (btcPrice * btcChange) / 100 : 0,
          changePercent: btcChange || 0,
          type: 'crypto',
        });
      }

      if (cryptoData.ethereum) {
        const ethPrice = cryptoData.ethereum.usd;
        const ethChange = cryptoData.ethereum.usd_24h_change || 0;
        assets.push({
          symbol: 'ETH',
          name: 'Ethereum',
          price: ethPrice || 3200,
          change: ethPrice ? (ethPrice * ethChange) / 100 : 0,
          changePercent: ethChange || 0,
          type: 'crypto',
        });
      }

      if (cryptoData.solana) {
        const solPrice = cryptoData.solana.usd;
        const solChange = cryptoData.solana.usd_24h_change || 0;
        assets.push({
          symbol: 'SOL',
          name: 'Solana',
          price: solPrice || 145,
          change: solPrice ? (solPrice * solChange) / 100 : 0,
          changePercent: solChange || 0,
          type: 'crypto',
        });
      }
    }

    // Add global stocks
    const stocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', basePrice: 178, change: 2.5 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', basePrice: 142, change: -1.2 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', basePrice: 418, change: 3.1 },
      { symbol: 'TSLA', name: 'Tesla Inc.', basePrice: 248, change: -2.8 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', basePrice: 186, change: 1.5 },
    ];

    stocks.forEach(stock => {
      assets.push({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.basePrice,
        change: (stock.basePrice * stock.change) / 100,
        changePercent: stock.change,
        type: 'stock',
      });
    });

    // Add Indian market stocks
    const indianStocks = [
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3050, changePercent: 1.5 },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3720, changePercent: 1.5 },
      { symbol: 'INFY', name: 'Infosys Limited', price: 1710, changePercent: 1.5 },
      { symbol: 'WIPRO', name: 'Wipro Limited', price: 520, changePercent: 1.6 },
      { symbol: 'HDFC', name: 'HDFC Bank', price: 1670, changePercent: 1.2 },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1060, changePercent: 1.4 },
      { symbol: 'AXISBANK', name: 'Axis Bank', price: 1150, changePercent: 1.6 },
      { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 10200, changePercent: 1.5 },
      { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 815, changePercent: 1.5 },
      { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', price: 2040, changePercent: 1.5 },
    ];

    indianStocks.forEach(stock => {
      assets.push({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: (stock.price * stock.changePercent) / 100,
        changePercent: stock.changePercent,
        type: 'stock',
      });
    });

    return assets.length > 0 ? assets : DEFAULT_ASSETS;
  } catch (error) {
    console.error('Error fetching dashboard assets:', error);
    return DEFAULT_ASSETS;
  }
};

export const searchAssets = async (query: string): Promise<Asset[]> => {
  try {
    const upperQuery = query.toUpperCase();
    
    // Fetch all assets and search
    const allAssets = await getDashboardAssets();
    
    const results = allAssets.filter(
      asset =>
        asset.symbol.includes(upperQuery) ||
        asset.name.toUpperCase().includes(upperQuery)
    );

    return results;
  } catch (error) {
    console.error('Error searching assets:', error);
    return [];
  }
};

export const getAssetDetails = async (ticker: string): Promise<Asset | null> => {
  try {
    const isCrypto = ['BTC', 'ETH', 'SOL'].includes(ticker);

    if (isCrypto) {
      const cryptoMap: any = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        SOL: 'solana',
      };
      
      const cryptoData = await getCryptoPrices([cryptoMap[ticker]]);
      if (!cryptoData || !cryptoData[cryptoMap[ticker]]) {
        // Return from default assets
        const asset = DEFAULT_ASSETS.find(a => a.symbol === ticker);
        return asset || null;
      }

      const data = cryptoData[cryptoMap[ticker]];
      return {
        symbol: ticker,
        name: ticker === 'BTC' ? 'Bitcoin' : ticker === 'ETH' ? 'Ethereum' : 'Solana',
        price: data.usd || 0,
        change: data.usd ? (data.usd * (data.usd_24h_change || 0)) / 100 : 0,
        changePercent: data.usd_24h_change || 0,
        type: 'crypto',
      };
    }

    // For stocks, return from default data
    const asset = DEFAULT_ASSETS.find(a => a.symbol === ticker);
    if (asset) {
      return {
        ...asset,
        price: asset.price || 0,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching asset details:', error);
    return null;
  }
};

export const getAssetHistory = async (ticker: string) => {
  try {
    // Generate realistic historical data
    const data = [];
    const isCrypto = ['BTC', 'ETH', 'SOL'].includes(ticker);
    
    const priceMap: any = {
      BTC: 67000,
      ETH: 3200,
      SOL: 145,
      AAPL: 178,
      GOOGL: 142,
      MSFT: 418,
      TSLA: 248,
      AMZN: 186,
      RELIANCE: 3050,
      TCS: 3720,
      INFY: 1710,
      WIPRO: 520,
      HDFC: 1670,
      ICICIBANK: 1060,
      AXISBANK: 1150,
      MARUTI: 10200,
      TATAMOTORS: 815,
      BAJAJFINSV: 2040,
    };

    const basePrice = priceMap[ticker] || 100;

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const randomChange = (Math.random() - 0.5) * 4;
      const price = basePrice * (1 + randomChange / 100) * (1 + (Math.random() - 0.5) * 0.05);

      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100,
      });
    }

    return data;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};

export const getAssetNews = async (ticker: string) => {
  try {
    const isIndian = ['RELIANCE', 'TCS', 'INFY', 'WIPRO', 'HDFC', 'ICICIBANK', 'AXISBANK', 'MARUTI', 'TATAMOTORS', 'BAJAJFINSV'].includes(ticker);

    const historicEvents = [
      {
        title: '1602: Dutch East India Company issues the world’s first shares',
        source: 'Historical Record',
        sentiment: 'positive',
        date: '1602-03-20',
        score: 0.92,
      },
      {
        title: '1792: Buttonwood Agreement creates the New York Stock Exchange',
        source: 'Historical Record',
        sentiment: 'positive',
        date: '1792-05-17',
        score: 0.89,
      },
      {
        title: '1929: Wall Street crash triggers the Great Depression',
        source: 'Historical Record',
        sentiment: 'negative',
        date: '1929-10-29',
        score: 0.12,
      },
      {
        title: '1987: Black Monday global selloff',
        source: 'Historical Record',
        sentiment: 'negative',
        date: '1987-10-19',
        score: 0.18,
      },
      {
        title: '2000: Dot-com bubble collapse slows tech stocks',
        source: 'Historical Record',
        sentiment: 'negative',
        date: '2000-03-10',
        score: 0.22,
      },
      {
        title: '2008: Global Financial Crisis peaks after Lehman collapse',
        source: 'Historical Record',
        sentiment: 'negative',
        date: '2008-09-15',
        score: 0.16,
      },
      {
        title: '2020: Pandemic drives fastest market crash and rebound',
        source: 'Historical Record',
        sentiment: 'mixed',
        date: '2020-03-16',
        score: 0.46,
      },
      {
        title: '2024: AI and green transition reshape investor focus',
        source: 'Historical Record',
        sentiment: 'positive',
        date: '2024-01-01',
        score: 0.75,
      },
    ];

    const globalNews = [
      {
        title: 'Federal Reserve keeps rates steady ahead of economic data',
        source: 'Bloomberg',
        sentiment: 'neutral',
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        score: 0.54,
      },
      {
        title: 'Tech earnings cycle shows resilient demand',
        source: 'Reuters',
        sentiment: 'positive',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        score: 0.72,
      },
      {
        title: 'Energy stocks stabilize on easing supply concerns',
        source: 'CNBC',
        sentiment: 'neutral',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        score: 0.60,
      },
    ];

    const indiaNews = [
      {
        title: '1991: India opens economy with landmark reforms',
        source: 'Historical Record',
        sentiment: 'positive',
        date: '1991-07-24',
        score: 0.88,
      },
      {
        title: '2008: Global crisis tests Indian banking resilience',
        source: 'Historical Record',
        sentiment: 'mixed',
        date: '2008-10-01',
        score: 0.50,
      },
      {
        title: '2023: Strong domestic consumption supports market recovery',
        source: 'Economic Times',
        sentiment: 'positive',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        score: 0.77,
      },
      {
        title: '2024: Indian tech exports gain momentum with AI adoption',
        source: 'Mint',
        sentiment: 'positive',
        date: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        score: 0.82,
      },
    ];

    const newsArticles = isIndian
      ? [...historicEvents, ...indiaNews]
      : [...historicEvents, ...globalNews];

    const overallScore = newsArticles.reduce((sum, article) => sum + article.score, 0) / newsArticles.length;
    const overallSentiment = overallScore > 0.65 ? 'Positive' : overallScore < 0.35 ? 'Negative' : 'Mixed';

    return {
      articles: newsArticles,
      overall_sentiment: overallSentiment,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      articles: [],
      overall_sentiment: 'Neutral',
    };
  }
};

export const getAssetPrediction = async (ticker: string) => {
  try {
    const currentPrices: any = {
      BTC: 67000,
      ETH: 3200,
      SOL: 145,
      AAPL: 178,
      GOOGL: 142,
      MSFT: 418,
      TSLA: 248,
      AMZN: 186,
      RELIANCE: 3050,
      TCS: 3720,
      INFY: 1710,
      WIPRO: 520,
      HDFC: 1670,
      ICICIBANK: 1060,
      AXISBANK: 1150,
      MARUTI: 10200,
      TATAMOTORS: 815,
      BAJAJFINSV: 2040,
    };

    const currentPrice = currentPrices[ticker] || 100;
    
    // Get sentiment data from news
    const newsData = await getAssetNews(ticker);
    const sentimentScores = newsData.articles.map(a => a.score);
    const avgSentiment = sentimentScores.length > 0 
      ? sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length 
      : 0.5;

    // Sentiment-based predictions: positive sentiment -> bullish prediction
    const timeframeConfig = {
      '24h': { volatility: 0.03, sentimentWeight: 0.3 },
      '7d': { volatility: 0.08, sentimentWeight: 0.5 },
      '30d': { volatility: 0.15, sentimentWeight: 0.7 },
    };

    const predictions = Object.entries(timeframeConfig).map(([timeframe, config]: any) => {
      // Sentiment drives direction, volatility adds randomness
      const sentimentShift = (avgSentiment - 0.5) * config.sentimentWeight;
      const randomShift = (Math.random() - 0.5) * config.volatility;
      const totalShift = sentimentShift + randomShift;
      
      const predictedPrice = currentPrice * (1 + totalShift);
      
      // Calculate confidence based on sentiment strength
      const sentimentConfidence = Math.abs(avgSentiment - 0.5) * 40 + 40;
      const confidence = Math.min(95, Math.max(50, sentimentConfidence + Math.random() * 10));

      let trend: 'bullish' | 'bearish' | 'neutral';
      if (predictedPrice > currentPrice * 1.02) trend = 'bullish';
      else if (predictedPrice < currentPrice * 0.98) trend = 'bearish';
      else trend = 'neutral';

      return {
        timeframe,
        predictedPrice: Math.round(predictedPrice * 100) / 100,
        confidence: Math.round(confidence),
        trend,
      };
    });

    return {
      symbol: ticker,
      predictions,
      sentimentScore: Math.round(avgSentiment * 100),
    };
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return null;
  }
};
