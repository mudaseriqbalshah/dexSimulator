import { useSimulation } from '@/hooks/use-simulation';
import { ParameterConfiguration } from '@/components/parameter-configuration';
import { PriceChart } from '@/components/price-chart';
import { PoolStatus } from '@/components/pool-status';
import { SimulationResults } from '@/components/simulation-results';
import { TransactionLog } from '@/components/transaction-log';

export default function Home() {
  const {
    state,
    priceHistory,
    transactions,
    updateParameters,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    getResults,
  } = useSimulation();

  const results = getResults();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
              <h1 className="text-xl font-semibold text-foreground">DEX Price Simulator</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>Connected</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Parameter Configuration and Price Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ParameterConfiguration
              state={state}
              onUpdateParameters={updateParameters}
              onStart={startSimulation}
              onPause={pauseSimulation}
              onReset={resetSimulation}
            />
          </div>
          <div className="lg:col-span-2">
            <PriceChart priceHistory={priceHistory} currentPrice={state.price} />
          </div>
        </div>

        {/* Pool Status */}
        <PoolStatus state={state} />

        {/* Simulation Results and Transaction Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SimulationResults results={results} />
          <TransactionLog transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
