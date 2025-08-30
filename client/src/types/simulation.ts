export interface SimulationState {
  initialUSD: number;
  initialTACOS: number;
  USDTPool: number;
  TACOSPool: number;
  price: number;
  initialPrice: number;
  totalBuy: number;
  totalSell: number;
  transactionCount: number;
  maxTransactions: number;
  minTrade: number;
  maxTrade: number;
  isRunning: boolean;
  isPaused: boolean;
  progress: number;
}

export interface Transaction {
  id: number;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: number;
}

export interface PriceDataPoint {
  transaction: number;
  price: number;
  timestamp: number;
}

export interface SimulationResults {
  initialPrice: number;
  finalPrice: number;
  priceChange: number;
  priceChangePercent: number;
  totalBuyVolume: number;
  totalSellVolume: number;
  totalTransactions: number;
}
