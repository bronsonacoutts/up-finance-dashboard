import { describe, it, expect } from "vitest";
import { detectSubscriptions } from "./utils";
import { TransactionResource } from "@/types/transaction";
import { subDays } from "date-fns";

// Helper to create a transaction
const createTx = (description: string, amount: number, date: string): TransactionResource => ({
  type: "transactions",
  id: Math.random().toString(),
  attributes: {
    status: "SETTLED",
    rawText: description,
    description: description,
    amount: {
        value: `-${amount.toFixed(2)}`,
        currencyCode: "AUD",
        valueInBaseUnits: -Math.round(amount * 100)
    },
    createdAt: date,
    // ... other required fields mocked ...
    message: null,
    isCategorizable: true,
    holdInfo: null,
    roundUp: null,
    cashback: null,
    foreignAmount: null,
    cardPurchaseMethod: null,
    settledAt: date,
    transactionType: "PURCHASE",
    note: null,
    performingCustomer: null,
  },
  relationships: {
    account: { data: { type: "accounts", id: "acc-1" } },
    transferAccount: { data: null },
    category: { data: null },
    parentCategory: { data: null },
    tags: { data: [] },
  },
  links: { self: "http://test" },
});

describe("detectSubscriptions", () => {
  it("should detect a monthly subscription", () => {
    const today = new Date();
    const transactions = [
      createTx("Spotify", 11.99, subDays(today, 5).toISOString()),
      createTx("Spotify", 11.99, subDays(today, 35).toISOString()),
      createTx("Spotify", 11.99, subDays(today, 65).toISOString()),
    ];

    const subs = detectSubscriptions(transactions);
    expect(subs).toHaveLength(1);
    expect(subs[0].name).toBe("Spotify");
    expect(subs[0].billing.frequency).toBe("MONTHLY");
    expect(subs[0].status).toBe("ACTIVE");
  });

  it("should ignore irregular transactions", () => {
    const today = new Date();
    const transactions = [
      createTx("Cafe", 4.50, subDays(today, 2).toISOString()),
      createTx("Cafe", 4.50, subDays(today, 15).toISOString()),
      createTx("Cafe", 4.50, subDays(today, 45).toISOString()),
    ];

    const subs = detectSubscriptions(transactions);
    expect(subs).toHaveLength(0);
  });

  it("should detect multiple subscriptions", () => {
    const today = new Date();
    const transactions = [
      // Netflix
      createTx("Netflix", 16.99, subDays(today, 10).toISOString()),
      createTx("Netflix", 16.99, subDays(today, 40).toISOString()),
      // Gym (Fortnightly)
      createTx("Gym", 25.00, subDays(today, 3).toISOString()),
      createTx("Gym", 25.00, subDays(today, 17).toISOString()),
      createTx("Gym", 25.00, subDays(today, 31).toISOString()),
    ];

    const subs = detectSubscriptions(transactions);
    expect(subs).toHaveLength(2);
    const names = subs.map(s => s.name).sort();
    expect(names).toEqual(["Gym", "Netflix"]);
  });
});
