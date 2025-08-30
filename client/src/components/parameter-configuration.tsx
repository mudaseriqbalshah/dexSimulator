import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimulationState, TradingMode } from '@/types/simulation';

interface ParameterConfigurationProps {
  state: SimulationState;
  onUpdateParameters: (params: Partial<SimulationState>) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function ParameterConfiguration({
  state,
  onUpdateParameters,
  onStart,
  onPause,
  onReset,
}: ParameterConfigurationProps) {
  const handleInputChange = (field: keyof SimulationState, value: string) => {
    if (field === 'coinTicker') {
      onUpdateParameters({ [field]: value.toUpperCase() });
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        onUpdateParameters({ [field]: numValue });
      }
    }
  };

  const handleTradingModeChange = (value: TradingMode) => {
    onUpdateParameters({ tradingMode: value });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Simulation Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Initial Price Display */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">Initial Price</Label>
            <span className="text-lg font-mono font-bold text-primary" data-testid="text-initial-price-display">
              ${state.initialPrice.toFixed(6)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{state.coinTicker}/USDT starting price</p>
        </div>

        {/* Coin Ticker Input */}
        <div>
          <Label className="text-muted-foreground">Coin Ticker</Label>
          <Input
            type="text"
            value={state.coinTicker}
            onChange={(e) => handleInputChange('coinTicker', e.target.value)}
            className="bg-input border-border text-foreground"
            data-testid="input-coin-ticker"
            disabled={state.isRunning}
            placeholder="Enter coin symbol (e.g., BTC, ETH)"
            maxLength={10}
          />
        </div>

        <div>
          <Label className="text-muted-foreground">Initial USD Pool</Label>
          <Input
            type="number"
            value={state.initialUSD}
            onChange={(e) => handleInputChange('initialUSD', e.target.value)}
            className="bg-input border-border text-foreground"
            data-testid="input-initial-usd"
            disabled={state.isRunning}
          />
        </div>
        
        <div>
          <Label className="text-muted-foreground">Initial {state.coinTicker} Pool</Label>
          <Input
            type="number"
            value={state.initialTACOS}
            onChange={(e) => handleInputChange('initialTACOS', e.target.value)}
            className="bg-input border-border text-foreground"
            data-testid="input-initial-tacos"
            disabled={state.isRunning}
          />
        </div>
        
        <div>
          <Label className="text-muted-foreground">Number of Transactions</Label>
          <Input
            type="number"
            value={state.maxTransactions}
            onChange={(e) => handleInputChange('maxTransactions', e.target.value)}
            className="bg-input border-border text-foreground"
            data-testid="input-transaction-count"
            disabled={state.isRunning}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-muted-foreground">Min Trade</Label>
            <Input
              type="number"
              value={state.minTrade}
              onChange={(e) => handleInputChange('minTrade', e.target.value)}
              className="bg-input border-border text-foreground"
              data-testid="input-min-trade"
              disabled={state.isRunning}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">Max Trade</Label>
            <Input
              type="number"
              value={state.maxTrade}
              onChange={(e) => handleInputChange('maxTrade', e.target.value)}
              className="bg-input border-border text-foreground"
              data-testid="input-max-trade"
              disabled={state.isRunning}
            />
          </div>
        </div>
        
        {/* Trading Mode Selection */}
        <div>
          <Label className="text-muted-foreground">Trading Mode</Label>
          <Select value={state.tradingMode} onValueChange={handleTradingModeChange} disabled={state.isRunning}>
            <SelectTrigger className="bg-input border-border text-foreground" data-testid="select-trading-mode">
              <SelectValue placeholder="Select trading mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BUY_ONLY">Only Buy</SelectItem>
              <SelectItem value="SELL_ONLY">Only Sell</SelectItem>
              <SelectItem value="MIXED">Mixed Buy/Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Percentage Controls for Mixed Mode */}
        {state.tradingMode === 'MIXED' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-muted-foreground">Buy Percentage</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={state.buyPercentage}
                onChange={(e) => handleInputChange('buyPercentage', e.target.value)}
                className="bg-input border-border text-foreground"
                data-testid="input-buy-percentage"
                disabled={state.isRunning}
              />
              <p className="text-xs text-muted-foreground mt-1">% of transactions that are buys</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Sell Percentage</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={state.sellPercentage}
                onChange={(e) => handleInputChange('sellPercentage', e.target.value)}
                className="bg-input border-border text-foreground"
                data-testid="input-sell-percentage"
                disabled={state.isRunning}
              />
              <p className="text-xs text-muted-foreground mt-1">% of transactions that are sells</p>
            </div>
          </div>
        )}

        {/* Transaction Fee */}
        <div>
          <Label className="text-muted-foreground">Transaction Fee (%)</Label>
          <Input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={state.transactionFeePercentage}
            onChange={(e) => handleInputChange('transactionFeePercentage', e.target.value)}
            className="bg-input border-border text-foreground"
            data-testid="input-transaction-fee"
            disabled={state.isRunning}
          />
          <p className="text-xs text-muted-foreground mt-1">Fee applied to each transaction (e.g., 0.3%)</p>
        </div>
        
        <div className="pt-4 space-y-3">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onStart}
            disabled={state.isRunning && !state.isPaused}
            data-testid="button-start-simulation"
          >
            {state.isRunning ? 'Running...' : 'Start Simulation'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={onPause}
              disabled={!state.isRunning}
              data-testid="button-pause-simulation"
            >
              {state.isPaused ? 'Resume' : 'Pause'}
            </Button>
            
            <Button
              variant="destructive"
              onClick={onReset}
              data-testid="button-reset-simulation"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
