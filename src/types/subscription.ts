// import { MoneyObject } from "./transaction";

export interface Subscription {
  id: string;
  name: string;
  merchant: {
    rawText: string;
    normalized: string;
    logo?: string;
  };
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
  detectionMethod: "AUTO" | "MANUAL";
  confidence: number; // 0-100
  amount: {
    current: number;
    currency: string;
  };
  priceChange?: {
    amount: number; // Difference (positive = increase)
    percentage: number;
    date: string;
  };
  sharing?: {
    isShared: boolean;
    sharedWith: string[]; // Names of people shared with
    yourShare: number;
    totalCost: number;
  };
  billing: {
    frequency: "WEEKLY" | "FORTNIGHTLY" | "MONTHLY" | "QUARTERLY" | "BIANNUAL" | "ANNUAL";
    cycleDays?: number; // Estimated days between cycles
    nextBillingDate: string;
    lastBillingDate: string;
  };
  history: {
    transactionId: string;
    date: string;
    amount: number;
    status: "HELD" | "SETTLED";
  }[];
  category?: string;
  tags: string[];
  metadata?: {
    startDate?: string;
    notes?: string;
    renewalReminder?: boolean;
    priceAlerts?: boolean;
  };
}
