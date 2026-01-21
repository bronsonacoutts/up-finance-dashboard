import { TransactionResource } from "@/types/transaction";
import { Subscription } from "@/types/subscription";
import { differenceInDays, parseISO, addDays, compareAsc } from "date-fns";

interface MerchantGroup {
  merchantName: string;
  transactions: TransactionResource[];
}

/**
 * Normalizes merchant names to group similar transactions.
 * Uppercases the text and removes all non-alphabetic characters (digits, punctuation, symbols),
 * while preserving spaces, so that examples like:
 *   - "Spotify 0123456789"      -> "SPOTIFY"
 *   - "APL*APPLE.COM/BILL"      -> "APLAPPLECOMBILL" (contains "APPLE")
 * can be matched against common subscription keywords.
 */
const normalizeMerchant = (rawText: string | null, description: string): string => {
  const text = rawText || description;
  // Simple normalization: uppercase and remove all non-letter characters except spaces
  // This is a basic implementation and can be improved with a smarter regex or a lookup table
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

  // Sort by date descending (newest first)
  const sortedTx = transactions.sort((a, b) =>
    new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime()
  );

  const dates = sortedTx.map(tx => parseISO(tx.attributes.createdAt));
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

  // Price Change Detection
  let priceChange: Subscription["priceChange"] | undefined = undefined;

  if (amounts.length > 1) {
    const previousAmount = amounts[1];
    if (Math.abs(latestAmount - previousAmount) > 0.5 &&
        Math.abs(latestAmount - previousAmount) / previousAmount > 0.02) {
      const diff = latestAmount - previousAmount;
      priceChange = {
        amount: diff,
        percentage: (diff / previousAmount) * 100,
        date: sortedTx[0].attributes.createdAt
      };
    }
  }

  const isConsistent = amounts.every(a => Math.abs(a - latestAmount) / latestAmount < 0.1);

  // Calculate next billing date
  const lastDate = dates[0];
  const nextDate = addDays(lastDate, Math.round(avgInterval));

  // Shared Subscription Logic (Simulation)
  // Logic: If it's a known family plan cost OR if the performing customer varies (joint account)
  // For now, let's look for "Family" in the description or specific price points
  // e.g. Spotify Family ~$18-20 AUD, Netflix Premium ~$25 AUD
  let sharing: Subscription["sharing"] | undefined = undefined;

  const description = sortedTx[0].attributes.description.toUpperCase();
  // Check if transactions are from a joint account (mock logic: check performingCustomer)
  // In a real app, we'd check account ownership type

  // Simulate logic: if description contains "FAMILY" or amounts are high for the service
  if (description.includes("FAMILY") ||
     (merchantName === "SPOTIFY" && latestAmount > 15) ||
     (merchantName === "NETFLIX" && latestAmount > 22)) {

      sharing = {
          isShared: true,
          sharedWith: ["Partner"], // Mocked for now
          totalCost: latestAmount,
          yourShare: latestAmount / 2 // Mocked 50/50 split
      };
  }

  return {
    id: `sub-${merchantName.toLowerCase().replace(/\s/g, "-")}`,
    name: sortedTx[0].attributes.description, // Use the most recent description
    merchant: {
      rawText: sortedTx[0].attributes.rawText || "",
      normalized: merchantName,
    },
    status: "ACTIVE",
    detectionMethod: "AUTO",
    confidence: isConsistent || priceChange ? 90 : 70,
    amount: {
      current: latestAmount,
      currency: sortedTx[0].attributes.amount.currencyCode,
    },
    priceChange,
    sharing,
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

  // Sort by next billing date
  return subscriptions.sort((a, b) =>
    compareAsc(parseISO(a.billing.nextBillingDate), parseISO(b.billing.nextBillingDate))
  );
};
