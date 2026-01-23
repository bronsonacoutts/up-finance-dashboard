import { TransactionResource } from "@/types/transaction";
import { Subscription } from "@/types/subscription";
import { differenceInDays, parseISO, addDays, compareAsc } from "date-fns";

interface MerchantGroup {
  merchantName: string;
  transactions: TransactionResource[];
}

/**
 * Normalizes merchant names to group similar transactions.
 * e.g., "Spotify 0123456789" -> "SPOTIFY"
 */
const normalizeMerchant = (rawText: string | null, description: string): string => {
  const text = rawText || description;
  // Simple normalization: uppercase and remove numbers/special chars at the end
  // This is a basic implementation and can be improved with regex or a lookup table
  let normalized = text.toUpperCase().replace(/[^A-Z\s]/g, "").trim();

  // Common subscription keywords cleanup
  const keywords = ["SPOTIFY", "NETFLIX", "APPLE", "GOOGLE", "AMAZON", "ADOBE", "AWS", "PATREON", "DISNEY", "BINGE", "STAN", "AUDIBLE"];

  for (const keyword of keywords) {
    if (normalized.includes(keyword)) {
      return keyword;
    }
  }

  // If no common keyword, take the first 2 words
  const parts = normalized.split(" ");
  if (parts.length > 2) {
    return parts.slice(0, 2).join(" ");
  }

  return normalized;
};

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

  // Pre-parse dates and sort by date descending (newest first)
  const transactionsWithDates = transactions.map(tx => ({
    tx,
    createdAt: parseISO(tx.attributes.createdAt),
  }));

  transactionsWithDates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const sortedTx = transactionsWithDates.map(item => item.tx);
  const dates = transactionsWithDates.map(item => item.createdAt);
  const intervals: number[] = [];

  for (let i = 0; i < dates.length - 1; i++) {
    const diff = differenceInDays(dates[i], dates[i+1]);
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
  const lastDate = dates[0];
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
      lastBillingDate: lastDate.toISOString(),
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

  // Pre-parse dates and sort by next billing date
  const subscriptionsWithParsedDates = subscriptions.map(sub => ({
    sub,
    nextBillingDate: parseISO(sub.billing.nextBillingDate),
  }));

  subscriptionsWithParsedDates.sort((a, b) => compareAsc(a.nextBillingDate, b.nextBillingDate));

  return subscriptionsWithParsedDates.map(item => item.sub);
};
