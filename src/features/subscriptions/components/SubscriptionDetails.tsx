import { Subscription } from "@/types/subscription";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

interface SubscriptionDetailsProps {
  subscription: Subscription | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionDetails = ({ subscription, open, onOpenChange }: SubscriptionDetailsProps) => {
  if (!subscription) return null;

  const chartData = [...subscription.history]
    .reverse()
    .map(h => ({
      date: format(parseISO(h.date), "MMM d"),
      amount: h.amount,
      fullDate: h.date,
    }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between mr-8">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                    {subscription.name.charAt(0)}
                </div>
                <div>
                    <DialogTitle className="text-xl">{subscription.name}</DialogTitle>
                    <DialogDescription>{subscription.merchant.normalized}</DialogDescription>
                </div>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold">
                    {new Intl.NumberFormat("en-AU", { style: "currency", currency: subscription.amount.currency }).format(subscription.amount.current)}
                </div>
                <div className="text-sm text-muted-foreground">
                    per {subscription.billing.frequency.toLowerCase().replace("ly", "")}
                </div>
             </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
            {/* Price Change Alert */}
            {subscription.priceChange && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-200">Price Increase Detected</h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                            The price increased by {new Intl.NumberFormat("en-AU", { style: "currency", currency: subscription.amount.currency }).format(subscription.priceChange.amount)} ({subscription.priceChange.percentage.toFixed(1)}%) on {format(parseISO(subscription.priceChange.date), "MMM d, yyyy")}.
                        </p>
                    </div>
                </div>
            )}

            {/* Shared Subscription Info */}
            {subscription.sharing?.isShared && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-200">Shared Subscription</h4>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Your share: {new Intl.NumberFormat("en-AU", { style: "currency", currency: subscription.amount.currency }).format(subscription.sharing.yourShare)}
                            </span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                            Shared with {subscription.sharing.sharedWith.join(", ")}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                    <div className="text-sm text-muted-foreground">Next Billing</div>
                    <div className="text-lg font-semibold">
                        {format(parseISO(subscription.billing.nextBillingDate), "EEEE, MMM d")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Usually around the {format(parseISO(subscription.billing.nextBillingDate), "do")}
                    </div>
                </Card>
                <Card className="p-4">
                     <div className="text-sm text-muted-foreground">Status</div>
                     <div className="flex items-center gap-2 mt-1">
                        <Badge variant={subscription.status === "ACTIVE" ? "default" : "secondary"}>
                            {subscription.status}
                        </Badge>
                        <Badge variant="outline">
                            {subscription.billing.frequency}
                        </Badge>
                     </div>
                </Card>
            </div>

            {/* Price History Chart */}
            <div className="h-[200px] w-full mt-2">
                <h4 className="text-sm font-medium mb-4">Price History</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "8px"
                            }}
                            itemStyle={{ color: "hsl(var(--foreground))" }}
                            formatter={(value: number | undefined) => [`$${(value || 0).toFixed(2)}`, "Amount"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="hsl(var(--primary))"
                            fillOpacity={1}
                            fill="url(#colorAmount)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
