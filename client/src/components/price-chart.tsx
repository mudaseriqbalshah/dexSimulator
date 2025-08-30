import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PriceDataPoint } from '@/types/simulation';

interface PriceChartProps {
  priceHistory: PriceDataPoint[];
  currentPrice: number;
}

export function PriceChart({ priceHistory, currentPrice }: PriceChartProps) {
  const formatPrice = (price: number) => `$${price.toFixed(6)}`;
  
  const chartData = priceHistory.map(point => ({
    transaction: point.transaction,
    price: point.price,
  }));

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">TACOS/USDT Price Chart</CardTitle>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-muted-foreground">Current Price:</span>
            <span className="text-success font-mono font-semibold" data-testid="text-current-price">
              {formatPrice(currentPrice)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 34%, 17%)" />
              <XAxis 
                dataKey="transaction" 
                stroke="hsl(215, 20%, 65%)"
                tick={{ fill: 'hsl(215, 20%, 65%)' }}
              />
              <YAxis 
                stroke="hsl(215, 20%, 65%)"
                tick={{ fill: 'hsl(215, 20%, 65%)' }}
                tickFormatter={formatPrice}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(223, 47%, 11%)',
                  border: '1px solid hsl(216, 34%, 17%)',
                  borderRadius: '8px',
                  color: 'hsl(213, 31%, 91%)',
                }}
                labelFormatter={(label) => `Transaction #${label}`}
                formatter={(value: number) => [formatPrice(value), 'Price']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(142, 69%, 58%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(142, 69%, 58%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
