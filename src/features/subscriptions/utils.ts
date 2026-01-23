import { TransactionResource } from "@/types/transaction";
import { Subscription } from "@/types/subscription";
import { differenceInDays, parseISO, addDays, compareAsc } from "date-fns";
import { normalizeMerchantV2 as normalizeMerchant } from "./normalization";

interface MerchantGroup {
  merchantName: string;
  transactions: TransactionResource[];
}

/**
 * Groups transactions by normalized merchant name.
 */
const groupTransactionsByMerchant = (transactions: TransactionResource[]): Record<string, MerchantGroup> => {
  const groups: Record<string, MerchantGroup> = {};

  transactions.forEach((tx) => {
    if (tx.attributes.amount.valueInBaseUnits >= 0) return; // Ignore income

    const merchant = normalizeMerchant(tx.attributes.rawText, tx.attributes.description);

    if (!groups[merchant]) {
      groups[merchant] = { merchantName: merchant, transactions: [] };
    }
    groups[merchant].transactions.push(tx);
  });

  return groups;
};

/**
 * Analyzes a group of transactions to determine if it's a subscription.
 */
const analyzeGroup = (group: MerchantGroup): Subscription | null => {
  const { transactions, merchantName } = group;

  // Need at least 2 transactions to detect a pattern
  if (transactions.length < 2) return null;

  // Sort by date descending (newest first)
  // Optimization: Map to array with timestamp to avoid repeated parsing
  const withTime = transactions.map((tx) => ({
    tx,
    time: new Date(tx.attributes.createdAt).getTime(),
  }));

  withTime.sort((a, b) => b.time - a.time);

  const sortedTx = withTime.map((x) => x.tx);
  const intervals: number[] = [];

  for (let i = 0; i < withTime.length - 1; i++) {
    const diff = differenceInDays(withTime[i].time, withTime[i + 1].time);
    intervals.push(diff);
  }

  // Calculate average interval
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  // Determine frequency
  let frequency: Subscription["billing"]["frequency"] | null = null;

  if (Math.abs(avgInterval - 7) <= 2) frequency = "WEEKLY";
  else if (Math.abs(avgInterval - 14) <= 3) frequency = "FORTNIGHTLY";
  else if (Math.abs(avgInterval - 30) <= 5) frequency = "MONTHLY";
  else if (Math.abs(avgInterval - 91) <= 10) frequency = "QUARTERLY";
  else if (Math.abs(avgInterval - 182) <= 15) frequency = "BIANNUAL";
  else if (Math.abs(avgInterval - 365) <= 20) frequency = "ANNUAL";

  if (!frequency) return null; // Not a regular pattern

  // Check amount consistency (allow small variance for currency conversion etc)
  const amounts = sortedTx.map(tx => Math.abs(parseFloat(tx.attributes.amount.value)));
  const latestAmount = amounts[0];
  const isConsistent = amounts.every(a => Math.abs(a - latestAmount) / latestAmount < 0.1); // 10% variance

  if (!isConsistent && frequency !== "ANNUAL") return null; // Allow annual to vary more? Maybe not.

  // Calculate next billing date
  const lastDate = withTime[0].time;
  const nextDate = addDays(lastDate, Math.round(avgInterval));

  return {
    id: `sub-${merchantName.toLowerCase().replace(/\s/g, "-")}`,
    name: sortedTx[0].attributes.description, // Use the most recent description
    merchant: {
      rawText: sortedTx[0].attributes.rawText || "",
      normalized: merchantName,
    },
    status: "ACTIVE",
    detectionMethod: "AUTO",
    confidence: isConsistent ? 90 : 70,
    amount: {
      current: latestAmount,
      currency: sortedTx[0].attributes.amount.currencyCode,
    },
    billing: {
      frequency,
      cycleDays: Math.round(avgInterval),
      nextBillingDate: nextDate.toISOString(),
      lastBillingDate: new Date(lastDate).toISOString(),
    },
    history: sortedTx.map(tx => ({
      transactionId: tx.id,
      date: tx.attributes.createdAt,
      amount: Math.abs(parseFloat(tx.attributes.amount.value)),
      status: tx.attributes.status,
    })),
    tags: ["Subscription", "Auto-Detected"],
  };
};

export const detectSubscriptions = (transactions: TransactionResource[]): Subscription[] => {
  const groups = groupTransactionsByMerchant(transactions);
  const subscriptions: Subscription[] = [];

  Object.values(groups).forEach(group => {
    const sub = analyzeGroup(group);
    if (sub) {
      subscriptions.push(sub);
    }
  });

  // Sort by next billing date
  return subscriptions.sort((a, b) =>
    compareAsc(parseISO(a.billing.nextBillingDate), parseISO(b.billing.nextBillingDate))
  );
};
