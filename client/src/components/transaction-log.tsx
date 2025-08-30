import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Transaction } from '@/types/simulation';

interface TransactionLogProps {
  transactions: Transaction[];
  coinTicker: string;
}

export function TransactionLog({ transactions, coinTicker }: TransactionLogProps) {
  const formatPrice = (price: number) => `$${price.toFixed(6)}`;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Recent Transactions</CardTitle>
          <span className="text-xs text-muted-foreground">
            Last {Math.min(transactions.length, 50)} transactions
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full">
          <div className="space-y-2">
            {transactions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No transactions yet. Start the simulation to see trading activity.
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-md"
                  data-testid={`transaction-${transaction.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        transaction.type === 'BUY' ? 'bg-success' : 'bg-destructive'
                      }`}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {transaction.type}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      #{transaction.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-foreground">
                      {transaction.amount.toFixed(2)} {transaction.type === 'BUY' ? 'USDT' : coinTicker}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      @{formatPrice(transaction.price)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
