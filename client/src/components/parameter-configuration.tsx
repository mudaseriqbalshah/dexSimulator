import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SimulationState } from '@/types/simulation';

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
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onUpdateParameters({ [field]: numValue });
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Simulation Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label className="text-muted-foreground">Initial TACOS Pool</Label>
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
