import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SimulationResults as SimulationResultsType } from '@/types/simulation';

interface SimulationResultsProps {
  results: SimulationResultsType;
}

export function SimulationResults({ results }: SimulationResultsProps) {
  const formatPrice = (price: number) => `$${price.toFixed(6)}`;
  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const priceChangeClass = results.priceChangePercent >= 0 ? 'text-success' : 'text-destructive';

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Simulation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Initial Price</span>
            <span className="font-mono text-sm text-foreground" data-testid="text-initial-price">
              {formatPrice(results.initialPrice)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Final Price</span>
            <span className="font-mono text-sm text-foreground" data-testid="text-final-price">
              {formatPrice(results.finalPrice)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Price Change</span>
            <span className={`font-mono text-sm ${priceChangeClass}`} data-testid="text-price-change">
              {formatPercentage(results.priceChangePercent)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Total Buy Volume</span>
            <span className="font-mono text-sm text-foreground" data-testid="text-total-buy-volume">
              {results.totalBuyVolume.toLocaleString()} USDT
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Total Sell Volume</span>
            <span className="font-mono text-sm text-foreground" data-testid="text-total-sell-volume">
              {results.totalSellVolume.toLocaleString()} TACOS
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
