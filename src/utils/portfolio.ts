import AsyncStorage from '@react-native-async-storage/async-storage';

export type Holding = {
  symbol: string;
  amount: number;
  price: number;
  changePercent: number;
  boughtAt?: number;
};

const STORAGE_KEY = '@portfolio_holdings';

let holdingsCache: Holding[] = [];
let isInitialized = false;

// Initialize from AsyncStorage
const initializeHoldings = async () => {
  if (isInitialized) return;
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      holdingsCache = JSON.parse(stored);
    }
    isInitialized = true;
  } catch (error) {
    console.error('Error initializing holdings:', error);
    holdingsCache = [];
    isInitialized = true;
  }
};

const persistHoldings = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(holdingsCache));
  } catch (error) {
    console.error('Error persisting holdings:', error);
  }
};

export const getHoldings = async (): Promise<Holding[]> => {
  await initializeHoldings();
  return [...holdingsCache];
};

export const addHolding = async (h: Holding): Promise<void> => {
  await initializeHoldings();
  
  const idx = holdingsCache.findIndex((x) => x.symbol === h.symbol);
  if (idx >= 0) {
    // Accumulate with average price tracking
    const existing = holdingsCache[idx];
    const totalCost = (existing.amount * existing.price) + (h.amount * h.price);
    const totalAmount = existing.amount + h.amount;
    
    holdingsCache[idx] = {
      ...h,
      amount: totalAmount,
      price: totalCost / totalAmount,
      boughtAt: existing.boughtAt || Date.now(),
    };
  } else {
    holdingsCache.push({
      ...h,
      boughtAt: Date.now(),
    });
  }
  
  await persistHoldings();
};

export const sellHolding = async (symbol: string, amount: number): Promise<boolean> => {
  await initializeHoldings();
  
  const idx = holdingsCache.findIndex((x) => x.symbol === symbol);
  if (idx < 0) return false;
  
  const holding = holdingsCache[idx];
  if (holding.amount < amount) return false;
  
  if (holding.amount === amount) {
    holdingsCache.splice(idx, 1);
  } else {
    holding.amount -= amount;
  }
  
  await persistHoldings();
  return true;
};

export const clearHoldings = async (): Promise<void> => {
  await initializeHoldings();
  holdingsCache = [];
  await persistHoldings();
};

export default {
  getHoldings,
  addHolding,
  sellHolding,
  clearHoldings,
};
