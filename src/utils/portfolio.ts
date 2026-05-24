// Simple in-memory portfolio manager (non-persistent)
type Holding = {
  symbol: string;
  amount: number;
  price: number;
  changePercent: number;
};

let holdings: Holding[] = [];

export const getHoldings = async (): Promise<Holding[]> => {
  return holdings;
};

export const addHolding = async (h: Holding): Promise<void> => {
  // If symbol exists, accumulate amount
  const idx = holdings.findIndex((x) => x.symbol === h.symbol);
  if (idx >= 0) {
    holdings[idx].amount += h.amount;
    holdings[idx].price = h.price; // update latest price
    holdings[idx].changePercent = h.changePercent;
  } else {
    holdings.push(h);
  }
};

export const clearHoldings = async (): Promise<void> => {
  holdings = [];
};

export default {
  getHoldings,
  addHolding,
  clearHoldings,
};
