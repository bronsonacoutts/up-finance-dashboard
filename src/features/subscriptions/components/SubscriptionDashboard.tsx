import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useSubscriptionStore } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddSubscriptionDialog } from "./AddSubscriptionDialog";

export const SubscriptionDashboard = () => {
  const { subscriptions, isLoading, error, scanForSubscriptions } = useSubscriptionStore();

  useEffect(() => {
    scanForSubscriptions();
  }, [scanForSubscriptions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading subscriptions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
    // Basic normalization to monthly
    let monthlyAmount = sub.amount.current;
    if (sub.billing.frequency === "WEEKLY") monthlyAmount *= 4.33;
    if (sub.billing.frequency === "FORTNIGHTLY") monthlyAmount *= 2.16;
    if (sub.billing.frequency === "QUARTERLY") monthlyAmount /= 3;
    if (sub.billing.frequency === "BIANNUAL") monthlyAmount /= 6;
    if (sub.billing.frequency === "ANNUAL") monthlyAmount /= 12;
    return acc + monthlyAmount;
  }, 0);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscription Dashboard</h1>
        <AddSubscriptionDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(totalMonthlyCost)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {subscriptions.map((sub) => (
          <Card key={sub.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4">
             <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{sub.name}</h3>
                  <Badge variant={sub.billing.frequency === "ANNUAL" ? "secondary" : "default"}>
                    {sub.billing.frequency}
                  </Badge>
                  {sub.confidence < 80 && (
                     <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Review Needed
                     </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Next billing: {format(parseISO(sub.billing.nextBillingDate), "MMM d, yyyy")}
                </div>
             </div>
             <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {new Intl.NumberFormat("en-AU", { style: "currency", currency: sub.amount.currency }).format(sub.amount.current)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    per {sub.billing.frequency.toLowerCase().replace("ly", "")}
                  </div>
                </div>
                <Button variant="outline" size="sm">Details</Button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
