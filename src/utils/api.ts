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
    
    const newsArticles = isIndian ? [
      {
        title: 'Indian Markets Rally on Strong Corporate Earnings',
        source: 'Economic Times',
        sentiment: 'positive',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        score: 0.85,
      },
      {
        title: 'RBI Maintains Stable Monetary Policy',
        source: 'Business Today',
        sentiment: 'neutral',
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        score: 0.45,
      },
      {
        title: 'Indian IT Sector Shows Strong Growth',
        source: 'The Hindu Business',
        sentiment: 'positive',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        score: 0.78,
      },
      {
        title: 'Banking Sector Expansion Continues',
        source: 'Mint',
        sentiment: 'positive',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        score: 0.72,
      },
      {
        title: 'Auto Industry Recovers from Global Slowdown',
        source: 'Livemint',
        sentiment: 'neutral',
        date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        score: 0.52,
      },
    ] : [
      {
        title: 'Market Reaches New Heights Amid Economic Optimism',
        source: 'Financial Times',
        sentiment: 'positive',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        score: 0.85,
      },
      {
        title: 'Federal Reserve Signals Cautious Approach to Interest Rates',
        source: 'Bloomberg',
        sentiment: 'neutral',
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        score: 0.45,
      },
      {
        title: 'Tech Stocks Rally on Strong Earnings Reports',
        source: 'Reuters',
        sentiment: 'positive',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        score: 0.78,
      },
      {
        title: 'Oil Prices Stabilize After Global Supply Adjustments',
        source: 'CNBC',
        sentiment: 'neutral',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        score: 0.52,
      },
      {
        title: 'Crypto Market Volatility Continues as Institutions Increase Exposure',
        source: 'CoinDesk',
        sentiment: 'positive',
        date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        score: 0.72,
      },
    ];

    const overallSentiment = 'Positive';
    
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
    
    const predictions = [
      {
        timeframe: '24h',
        predictedPrice: currentPrice * (1 + (Math.random() - 0.5) * 0.05),
        confidence: 72 + Math.random() * 15,
        trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
      },
      {
        timeframe: '7d',
        predictedPrice: currentPrice * (1 + (Math.random() - 0.5) * 0.12),
        confidence: 65 + Math.random() * 20,
        trend: Math.random() > 0.5 ? 'bullish' : 'neutral',
      },
      {
        timeframe: '30d',
        predictedPrice: currentPrice * (1 + (Math.random() - 0.5) * 0.25),
        confidence: 55 + Math.random() * 25,
        trend: Math.random() > 0.5 ? 'bullish' : 'bearish',
      },
    ];

    return {
      symbol: ticker,
      predictions,
    };
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return null;
  }
};
