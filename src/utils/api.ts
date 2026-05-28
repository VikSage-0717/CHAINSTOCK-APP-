import { Asset } from './mockData';
import { getMarketEvents } from './marketEvents';
import { NEWS_API_KEY } from '../config';
import { Platform } from 'react-native';

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

// Keywords used to match company/industry mentions in news/events
const SYMBOL_KEYWORDS: Record<string, string[]> = {
  BTC: ['bitcoin', 'crypto'],
  ETH: ['ethereum', 'crypto'],
  SOL: ['solana', 'crypto'],
  AAPL: ['apple', 'iphone', 'mac', 'services', 'tech'],
  MSFT: ['microsoft', 'azure', 'windows', 'tech'],
  GOOGL: ['google', 'alphabet', 'ads', 'search', 'tech'],
  TSLA: ['tesla', 'ev', 'automotive', 'auto'],
  AMZN: ['amazon', 'ecommerce', 'retail', 'aws'],
  RELIANCE: ['reliance', 'energy', 'oil', 'india'],
  TCS: ['tcs', 'it', 'software', 'tech'],
  INFY: ['infosys', 'it', 'software', 'tech'],
  HDFC: ['bank', 'banking', 'finance', 'hdfc'],
  ICICIBANK: ['bank', 'banking', 'finance', 'icici'],
  AXISBANK: ['bank', 'banking', 'finance', 'axis'],
  MARUTI: ['maruti', 'auto', 'automotive'],
  TATAMOTORS: ['tata', 'motors', 'auto'],
};

// Lightweight sentiment scoring using keyword matching. This is a fallback
// for when no dedicated sentiment API is available.
const POSITIVE_WORDS = ['gain', 'gains', 'rise', 'rises', 'surge', 'surges', 'rally', 'rallies', 'beat', 'beats', 'profit', 'profits', 'optimistic', 'growth', 'strong', 'upgrade', 'bull', 'outperform'];
const NEGATIVE_WORDS = ['drop', 'drops', 'fall', 'falls', 'decline', 'declines', 'loss', 'losses', 'miss', 'misses', 'weak', 'downgrade', 'bear', 'crash', 'sell', 'plunge', 'slump', 'concern', 'scare'];

function scoreTextSentiment(text: string, keywords: string[] = []) {
  if (!text) return 0.5;
  const t = text.toLowerCase();
  let pos = 0;
  let neg = 0;
  for (const w of POSITIVE_WORDS) if (t.includes(w)) pos++;
  for (const w of NEGATIVE_WORDS) if (t.includes(w)) neg++;

  // Normalized delta between -1..1
  const delta = (pos - neg) / (pos + neg + 1);

  // Base influence of detected sentiment words; increase slightly when keywords (company/industry) appear
  let influence = 0.45;
  if (keywords && keywords.length > 0) {
    const kwMatches = keywords.reduce((acc, k) => acc + (t.includes(k.toLowerCase()) ? 1 : 0), 0);
    if (kwMatches > 0) {
      influence *= 1 + Math.min(0.5, kwMatches * 0.12);
    }
  }

  const score = 0.5 + delta * influence;
  // Allow slightly wider range but keep clamped to avoid extremes
  return Math.max(0.03, Math.min(0.97, score));
}

async function fetchExternalNews(ticker: string, days = 30) {
  if (!NEWS_API_KEY || NEWS_API_KEY.trim() === '') return null;
  try {
    const asset = await getAssetDetails(ticker);
    const keywords = SYMBOL_KEYWORDS[ticker] || [ticker.toLowerCase()];
    const qParts = [(asset?.name || ticker), ...keywords].slice(0, 8);
    const q = qParts.map(p => `"${p}"`).join(' OR ');
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${from}&language=en&pageSize=50&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.warn('External news fetch failed', res.status);
      return null;
    }
    const json = await res.json();
    if (!json.articles || !Array.isArray(json.articles)) return null;

    const articles = json.articles.map((a: any) => ({
      title: a.title || '',
      source: (a.source && a.source.name) || 'NewsAPI',
      description: a.description || '',
      date: a.publishedAt || a.published_at || new Date().toISOString(),
      score: scoreTextSentiment((a.title || '') + ' ' + (a.description || ''), keywords),
      sentiment: null,
    }));

    return articles;
  } catch (err) {
    console.error('Error fetching external news:', err);
    return null;
  }
}

// Fetch crypto prices from CoinGecko
export const getCryptoPrices = async (ids: string[]): Promise<any> => {
  try {
    // Avoid calling CoinGecko directly from web (CORS). Use fallback/null so UI uses default data.
    if (Platform && Platform.OS === 'web') {
      return null;
    }
    const idList = ids.join(',');
    const response = await fetch(
      `${COINGECKO_URL}/simple/price?ids=${idList}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );
    if (!response.ok) throw new Error('Failed to fetch crypto prices');
    return await response.json();
  } catch (error) {
    if (!(Platform && Platform.OS === 'web')) console.error('Error fetching crypto prices:', error);
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
    // Options: recentDays controls recency window; includeHistorical will add old events
    const recentDays = 30;
    const includeHistorical = false;
    const recentCutoff = Date.now() - recentDays * 24 * 60 * 60 * 1000;

    // Try external news provider first (if configured). External articles are already
    // restricted to the last `recentDays` by the fetchExternalNews helper.
    try {
      const external = await fetchExternalNews(ticker, recentDays);
      if (external && external.length > 0) {
        const keywords = SYMBOL_KEYWORDS[ticker] || [ticker.toLowerCase()];
        const filtered = external.filter(a => {
          const text = (a.title + ' ' + (a.description || '') + ' ' + (a.source || '')).toLowerCase();
          return keywords.some(k => text.includes(k));
        });

        let articles = filtered.length > 0 ? filtered : external;

        // Augment with relevant recent market events to make asset-level analysis richer
        try {
          const marketEvents = getMarketEvents();
          const relevantEvents = marketEvents.filter(e => {
            try {
              const t = new Date(e.date).getTime();
              if (isNaN(t) || t < recentCutoff) return false;
              const affected = (e.affectedAssets || []).map(a => String(a).toLowerCase());
              if (affected.includes(ticker.toLowerCase())) return true;
              const txt = ((e.event || '') + ' ' + (e.description || '')).toLowerCase();
              return keywords.some(k => txt.includes(k));
            } catch (err) {
              return false;
            }
          }).map(e => {
            const baseScore = e.impactType === 'positive' ? 0.8 : e.impactType === 'negative' ? 0.2 : 0.5;
            const adj = Math.sign(e.priceImpact || 0) * Math.min(0.15, Math.abs((e.priceImpact || 0) / 100));
            const score = Math.max(0.03, Math.min(0.97, baseScore + adj));
            return {
              title: e.event,
              source: 'MarketEvent',
              description: e.description || '',
              date: e.date,
              score,
              sentiment: e.impactType || 'mixed',
            };
          });

          if (relevantEvents.length > 0) {
            articles = [...relevantEvents, ...articles];
          }
        } catch (err) {
          // ignore market event merge failures
        }

        const overallScore = articles.reduce((s, art) => s + (art.score || 0.5), 0) / articles.length;
        const overallSentiment = overallScore > 0.65 ? 'Positive' : overallScore < 0.35 ? 'Negative' : 'Mixed';

        return {
          articles,
          overall_sentiment: overallSentiment,
          average_score: overallScore,
          source: 'external',
        };
      }
    } catch (err) {
      // If external news fails, fall back to local mock data below
      console.warn('External news provider error, falling back to local news:', err);
    }

    const isIndian = ['RELIANCE', 'TCS', 'INFY', 'WIPRO', 'HDFC', 'ICICIBANK', 'AXISBANK', 'MARUTI', 'TATAMOTORS', 'BAJAJFINSV'].includes(ticker);

    // Small set of recent synthetic news items (would be replaced by real news API)
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

    // Historical events (kept separate and not mixed into recent news for asset-level analysis)
    const historicEvents = [
      { title: '1602: Dutch East India Company issues the world’s first shares', source: 'Historical Record', sentiment: 'positive', date: '1602-03-20', score: 0.92 },
      { title: '1792: Buttonwood Agreement creates the New York Stock Exchange', source: 'Historical Record', sentiment: 'positive', date: '1792-05-17', score: 0.89 },
      { title: '1929: Wall Street crash triggers the Great Depression', source: 'Historical Record', sentiment: 'negative', date: '1929-10-29', score: 0.12 },
      { title: '1987: Black Monday global selloff', source: 'Historical Record', sentiment: 'negative', date: '1987-10-19', score: 0.18 },
      { title: '2000: Dot-com bubble collapse slows tech stocks', source: 'Historical Record', sentiment: 'negative', date: '2000-03-10', score: 0.22 },
      { title: '2008: Global Financial Crisis peaks after Lehman collapse', source: 'Historical Record', sentiment: 'negative', date: '2008-09-15', score: 0.16 },
      { title: '2020: Pandemic drives fastest market crash and rebound', source: 'Historical Record', sentiment: 'mixed', date: '2020-03-16', score: 0.46 },
      { title: '2024: AI and green transition reshape investor focus', source: 'Historical Record', sentiment: 'positive', date: '2024-01-01', score: 0.75 },
    ];

    
    // recentCutoff already defined above

    // Choose pool of candidate articles depending on region
    const candidate = isIndian ? [...indiaNews] : [...globalNews];

    // Filter by recency
    const recentCandidates = candidate.filter(a => {
      try {
        const t = new Date(a.date).getTime();
        return !isNaN(t) && t >= recentCutoff;
      } catch (e) {
        return true;
      }
    });

    // Determine relevance based on keywords
    const keywords = SYMBOL_KEYWORDS[ticker] || [ticker.toLowerCase()];
    const relevant = recentCandidates.filter(a => {
      const text = (a.title + ' ' + a.source).toLowerCase();
      return keywords.some(k => text.includes(k));
    });

    // If no explicitly relevant recent article, fall back to recentCandidates
    const selectedArticles = relevant.length > 0 ? relevant : recentCandidates;

    // Optionally include historical events (disabled for asset-level recent analysis)
    let articles = includeHistorical ? [...historicEvents, ...selectedArticles] : selectedArticles;

    // Also include recent relevant market events (convert to article format)
    try {
      const marketEvents = getMarketEvents();
      const relevantEvents = marketEvents.filter(e => {
        try {
          const t = new Date(e.date).getTime();
          if (isNaN(t) || t < recentCutoff) return false;
          const affected = (e.affectedAssets || []).map(a => String(a).toLowerCase());
          if (affected.includes(ticker.toLowerCase())) return true;
          const txt = ((e.event || '') + ' ' + (e.description || '')).toLowerCase();
          const keywords = SYMBOL_KEYWORDS[ticker] || [ticker.toLowerCase()];
          return keywords.some(k => txt.includes(k));
        } catch (err) {
          return false;
        }
      }).map(e => {
        const baseScore = e.impactType === 'positive' ? 0.8 : e.impactType === 'negative' ? 0.2 : 0.5;
        const adj = Math.sign(e.priceImpact || 0) * Math.min(0.15, Math.abs((e.priceImpact || 0) / 100));
        const score = Math.max(0.03, Math.min(0.97, baseScore + adj));
        return {
          title: e.event,
          source: 'MarketEvent',
          description: e.description || '',
          date: e.date,
          score,
          sentiment: e.impactType || 'mixed',
        };
      });

      if (relevantEvents.length > 0) {
        articles = [...relevantEvents, ...articles];
      }
    } catch (err) {
      // ignore
    }

    const overallScore = articles.length > 0 ? articles.reduce((s, art) => s + (art.score || 0.5), 0) / articles.length : 0.5;
    const overallSentiment = overallScore > 0.65 ? 'Positive' : overallScore < 0.35 ? 'Negative' : 'Mixed';

    return {
      articles,
      overall_sentiment: overallSentiment,
      average_score: overallScore,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      articles: [],
      overall_sentiment: 'Neutral',
      average_score: 0.5,
    };
  }
};

export const getAssetPrediction = async (ticker: string, rangeYears: number = 1) => {
  try {
    // Prefer actual current price from getAssetDetails to keep UI consistent
    const assetDetails = await getAssetDetails(ticker);
    const fallbackPrices: any = {
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

    const currentPrice = assetDetails?.price ?? fallbackPrices[ticker] ?? 100;

    // Get sentiment data from news (recent filtered articles are returned by getAssetNews)
    const newsData = await getAssetNews(ticker);
    const now = Date.now();

    // Augment with recent verified market events (30-day window) that mention this asset or its industry
    const recentDays = 30;
    const recentCutoff = now - recentDays * 24 * 60 * 60 * 1000;
    const assetName = (assetDetails?.name || ticker).toLowerCase();

    const marketEvents = getMarketEvents();
    const relevantEvents = marketEvents.filter(e => {
      try {
        const t = new Date(e.date).getTime();
        if (isNaN(t) || t < recentCutoff) return false;
        // Match if affectedAssets contains the symbol or the event mentions the company name
        const affected = (e.affectedAssets || []).map(a => String(a).toLowerCase());
        if (affected.includes(ticker.toLowerCase())) return true;
        if (e.event.toLowerCase().includes(assetName) || e.description.toLowerCase().includes(assetName)) return true;
        return false;
      } catch (err) {
        return false;
      }
    });

    const eventArticles = relevantEvents.map(e => {
      const baseScore = e.impactType === 'positive' ? 0.8 : e.impactType === 'negative' ? 0.2 : 0.5;
      // Slightly adjust score by magnitude of priceImpact (clamped)
      const adj = Math.sign(e.priceImpact || 0) * Math.min(0.15, Math.abs((e.priceImpact || 0) / 100));
      const score = Math.max(0.05, Math.min(0.95, baseScore + adj));
      return {
        title: e.event,
        source: 'MarketEvent',
        sentiment: e.impactType,
        date: e.date,
        score,
      };
    });

    // Merge news and event-derived articles (newsData already filtered to ~30 days in getAssetNews)
    const mergedArticles = [ ...(newsData?.articles || []), ...eventArticles ];

    // Debug: log counts to help tuning (will show in Expo console)
    try {
      // eslint-disable-next-line no-console
      console.debug && console.debug('getAssetPrediction', ticker, 'newsArticles', (newsData?.articles || []).length, 'eventArticles', eventArticles.length, 'merged', mergedArticles.length);
    } catch (e) {}

    // Compute a time-decayed weighted average for sentiment (more recent => higher weight)
    let avgSentiment: number | null = null;
    if (mergedArticles && mergedArticles.length > 0) {
      let weightSum = 0;
      let weightedScore = 0;
      for (const a of mergedArticles) {
        const time = new Date(a.date).getTime();
        const daysAgo = isNaN(time) ? 0 : Math.max(0, (now - time) / (24 * 60 * 60 * 1000));
        // Exponential decay with 14 day scale to favor very recent news
        const weight = Math.exp(-daysAgo / 14);
        weightSum += weight;
        weightedScore += (a.score || 0.5) * weight;
      }
      avgSentiment = weightSum > 0 ? weightedScore / weightSum : null;
    }

    // If we have no recent news, mark sentiment as null (insufficient data)
    const hasSentiment = typeof avgSentiment === 'number' && !isNaN(avgSentiment);

    // Sentiment-based predictions: positive sentiment -> bullish prediction
    const rangeConfig = (() => {
      if (rangeYears <= 1) {
        return { label: '1Y', volatility: 0.006, sentimentWeight: 0.12, clamp: 0.03, trendThreshold: 0.015 };
      }
      if (rangeYears <= 3) {
        return { label: '3Y', volatility: 0.015, sentimentWeight: 0.20, clamp: 0.07, trendThreshold: 0.03 };
      }
      if (rangeYears <= 5) {
        return { label: '5Y', volatility: 0.025, sentimentWeight: 0.28, clamp: 0.12, trendThreshold: 0.05 };
      }
      if (rangeYears <= 7) {
        return { label: '7Y', volatility: 0.035, sentimentWeight: 0.36, clamp: 0.18, trendThreshold: 0.07 };
      }
      return { label: '10Y', volatility: 0.055, sentimentWeight: 0.48, clamp: 0.26, trendThreshold: 0.09 };
    })();

    const config = rangeConfig;
    const sentimentShift = hasSentiment ? (avgSentiment! - 0.5) * config.sentimentWeight : 0;
    const randomShift = (Math.random() - 0.5) * config.volatility;
    let totalShift = sentimentShift + randomShift;

    // Clamp extreme shifts for the selected horizon
    const maxClamp = config.clamp;
    if (totalShift > maxClamp) totalShift = maxClamp;
    if (totalShift < -maxClamp) totalShift = -maxClamp;

    // Add a small deterministic, ticker- and horizon-dependent shift so
    // moving the horizon produces visible per-stock differences even
    // when randomness is small. This keeps behavior stable but responsive.
    const tickerSeed = String(ticker).split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    const seedShift = (((tickerSeed % 100) - 50) / 10000) * rangeYears; // ~±0.005 * years max
    const predictedPrice = currentPrice * (1 + totalShift + seedShift);

    // Confidence: depends on amount of recent news and sentiment magnitude
    let confidenceBase = 50;
    if (hasSentiment) {
      confidenceBase += Math.min(40, Math.abs(avgSentiment! - 0.5) * 80);
    }
    const confidence = Math.min(95, Math.max(30, Math.round(confidenceBase + Math.random() * 10)));

    let trend: 'bullish' | 'bearish' | 'neutral';
    if (predictedPrice > currentPrice * (1 + config.trendThreshold)) trend = 'bullish';
    else if (predictedPrice < currentPrice * (1 - config.trendThreshold)) trend = 'bearish';
    else trend = 'neutral';

    const predictions = [
      {
        timeframe: config.label,
        predictedPrice: Math.round(predictedPrice * 100) / 100,
        confidence: Math.round(confidence),
        trend,
      },
    ];

    // Debug final prediction output
    try {
      console.debug && console.debug('getAssetPrediction.final', ticker, { avgSentiment, rangeYears, seedShift, predictions });
    } catch (e) {}

    return {
      symbol: ticker,
      predictions,
      sentimentScore: hasSentiment ? Math.round(avgSentiment! * 100) : null,
    };
  } catch (error) {
    console.error('Error fetching prediction:', error);
    return null;
  }
};
