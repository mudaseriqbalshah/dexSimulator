import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SimulationState } from '@/types/simulation';
import { DollarSign, TrendingUp, BarChart3, Clock } from 'lucide-react';

interface PoolStatusProps {
  state: SimulationState;
}

export function PoolStatus({ state }: PoolStatusProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">USDT Pool</p>
              <p className="text-2xl font-bold text-foreground" data-testid="text-usdt-pool">
                {formatNumber(state.USDTPool)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">TACOS Pool</p>
              <p className="text-2xl font-bold text-foreground" data-testid="text-tacos-pool">
                {formatNumber(state.TACOSPool)}
              </p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold text-foreground" data-testid="text-total-transactions">
                {state.transactionCount.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Progress</p>
              <p className="text-2xl font-bold text-foreground" data-testid="text-progress">
                {state.progress.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <div className="mt-3">
            <Progress 
              value={state.progress} 
              className="h-2"
              data-testid="progress-simulation"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
