import { useState, useCallback, useRef } from 'react';
import { SimulationState, Transaction, PriceDataPoint, SimulationResults, TradingMode } from '@/types/simulation';

function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useSimulation() {
  const [state, setState] = useState<SimulationState>({
    initialUSD: 5000,
    initialTACOS: 15625000,
    USDTPool: 5000,
    TACOSPool: 15625000,
    price: 0.00032,
    initialPrice: 0.00032,
    totalBuy: 0,
    totalSell: 0,
    transactionCount: 0,
    maxTransactions: 30000,
    minTrade: 10,
    maxTrade: 100,
    tradingMode: 'BUY_ONLY',
    buyPercentage: 80,
    sellPercentage: 20,
    isRunning: false,
    isPaused: false,
    progress: 0,
  });

  const [priceHistory, setPriceHistory] = useState<PriceDataPoint[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateParameters = useCallback((params: Partial<SimulationState>) => {
    setState(prev => {
      const newState = { ...prev, ...params };
      if (params.initialUSD !== undefined || params.initialTACOS !== undefined) {
        const initialPrice = newState.initialUSD / newState.initialTACOS;
        newState.initialPrice = initialPrice;
        newState.price = initialPrice;
        newState.USDTPool = newState.initialUSD;
        newState.TACOSPool = newState.initialTACOS;
      }
      return newState;
    });
  }, []);

  const buying = useCallback((i: number, currentState: SimulationState) => {
    const buyAmount = getRandomNumber(currentState.minTrade, currentState.maxTrade);
    const totalTacos = buyAmount / currentState.price;
    
    const newUSDTPool = currentState.USDTPool + buyAmount;
    const newTACOSPool = currentState.TACOSPool - totalTacos;
    const newPrice = newUSDTPool / newTACOSPool;
    const newTotalBuy = currentState.totalBuy + buyAmount;

    const transaction: Transaction = {
      id: i + 1,
      type: 'BUY',
      amount: buyAmount,
      price: newPrice,
      timestamp: Date.now(),
    };

    return {
      USDTPool: newUSDTPool,
      TACOSPool: newTACOSPool,
      price: newPrice,
      totalBuy: newTotalBuy,
      transaction,
    };
  }, []);

  const selling = useCallback((i: number, currentState: SimulationState) => {
    const sellAmount = getRandomNumber(currentState.minTrade, currentState.maxTrade);
    const totalUSDT = sellAmount * currentState.price;
    
    const newUSDTPool = currentState.USDTPool - totalUSDT;
    const newTACOSPool = currentState.TACOSPool + sellAmount;
    const newPrice = newUSDTPool / newTACOSPool;
    const newTotalSell = currentState.totalSell + sellAmount;

    const transaction: Transaction = {
      id: i + 1,
      type: 'SELL',
      amount: sellAmount,
      price: newPrice,
      timestamp: Date.now(),
    };

    return {
      USDTPool: newUSDTPool,
      TACOSPool: newTACOSPool,
      price: newPrice,
      totalSell: newTotalSell,
      transaction,
    };
  }, []);

  const runSimulationStep = useCallback(() => {
    setState(prev => {
      if (!prev.isRunning || prev.isPaused || prev.transactionCount >= prev.maxTransactions) {
        return prev;
      }

      let result: {
        USDTPool: number;
        TACOSPool: number;
        price: number;
        totalBuy?: number;
        totalSell?: number;
        transaction: Transaction;
      };
      let shouldBuy = false;

      // Determine if this transaction should be buy or sell based on trading mode
      if (prev.tradingMode === 'BUY_ONLY') {
        shouldBuy = true;
      } else if (prev.tradingMode === 'SELL_ONLY') {
        shouldBuy = false;
      } else { // MIXED mode
        // Use percentage to determine buy vs sell
        const randomPercent = Math.random() * 100;
        shouldBuy = randomPercent < prev.buyPercentage;
      }

      if (shouldBuy) {
        result = buying(prev.transactionCount, prev);
        const newState = {
          ...prev,
          USDTPool: result.USDTPool,
          TACOSPool: result.TACOSPool,
          price: result.price,
          totalBuy: result.totalBuy || prev.totalBuy,
          transactionCount: prev.transactionCount + 1,
          progress: ((prev.transactionCount + 1) / prev.maxTransactions) * 100,
        };

        // Add to price history
        setPriceHistory(prevHistory => [
          ...prevHistory,
          {
            transaction: newState.transactionCount,
            price: newState.price,
            timestamp: Date.now(),
          }
        ]);

        // Add to transactions (keep last 50)
        setTransactions(prevTransactions => {
          const newTransactions = [result.transaction, ...prevTransactions].slice(0, 50);
          return newTransactions;
        });

        return newState;
      } else {
        result = selling(prev.transactionCount, prev);
        const newState = {
          ...prev,
          USDTPool: result.USDTPool,
          TACOSPool: result.TACOSPool,
          price: result.price,
          totalSell: result.totalSell || prev.totalSell,
          transactionCount: prev.transactionCount + 1,
          progress: ((prev.transactionCount + 1) / prev.maxTransactions) * 100,
        };

        // Add to price history
        setPriceHistory(prevHistory => [
          ...prevHistory,
          {
            transaction: newState.transactionCount,
            price: newState.price,
            timestamp: Date.now(),
          }
        ]);

        // Add to transactions (keep last 50)
        setTransactions(prevTransactions => {
          const newTransactions = [result.transaction, ...prevTransactions].slice(0, 50);
          return newTransactions;
        });

        return newState;
      }
    });
  }, [buying, selling]);

  const startSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true, isPaused: false }));
    
    intervalRef.current = setInterval(() => {
      runSimulationStep();
    }, 10); // Run every 10ms for smooth animation
  }, [runSimulationStep]);

  const pauseSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const stopSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false, isPaused: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setState(prev => ({
      ...prev,
      USDTPool: prev.initialUSD,
      TACOSPool: prev.initialTACOS,
      price: prev.initialPrice,
      totalBuy: 0,
      totalSell: 0,
      transactionCount: 0,
      isRunning: false,
      isPaused: false,
      progress: 0,
    }));
    
    setPriceHistory([]);
    setTransactions([]);
  }, []);

  const getResults = useCallback((): SimulationResults => {
    const priceChange = state.price - state.initialPrice;
    const priceChangePercent = (priceChange / state.initialPrice) * 100;
    
    return {
      initialPrice: state.initialPrice,
      finalPrice: state.price,
      priceChange,
      priceChangePercent,
      totalBuyVolume: state.totalBuy,
      totalSellVolume: state.totalSell,
      totalTransactions: state.transactionCount,
    };
  }, [state]);

  return {
    state,
    priceHistory,
    transactions,
    updateParameters,
    startSimulation,
    pauseSimulation,
    stopSimulation,
    resetSimulation,
    getResults,
  };
}
