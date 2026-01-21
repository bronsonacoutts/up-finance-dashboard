import { TransactionResource } from "@/types/transaction";
import { subDays } from "date-fns";

const generateId = () => Math.random().toString(36).substr(2, 9);

const createTransaction = (
  description: string,
  amountVal: number,
  date: Date,
  category: string = "general"
): TransactionResource => {
  const amountStr = amountVal.toFixed(2);
  return {
    type: "transactions",
    id: generateId(),
    attributes: {
      status: "SETTLED",
      rawText: description.toUpperCase() + " HOLDINGS",
      description: description,
      message: null,
      isCategorizable: true,
      holdInfo: null,
      roundUp: null,
      cashback: null,
      amount: {
        currencyCode: "AUD",
        value: `-${amountStr}`,
        valueInBaseUnits: -Math.round(amountVal * 100),
      },
      foreignAmount: null,
      cardPurchaseMethod: null,
      settledAt: date.toISOString(),
      createdAt: date.toISOString(),
      transactionType: "PURCHASE",
      note: null,
      performingCustomer: {
        displayName: "Jules",
      },
    },
    relationships: {
      account: { data: { type: "accounts", id: "acc-1" } },
      transferAccount: { data: null },
      category: { data: { type: "categories", id: category } },
      parentCategory: { data: null },
      tags: { data: [] },
    },
    links: {
      self: `https://api.up.com.au/api/v1/transactions/${generateId()}`,
    },
  };
};

export const generateMockTransactions = (): TransactionResource[] => {
  const transactions: TransactionResource[] = [];
  const today = new Date();

  // Netflix - Monthly - 15th - Price Increase from $16.99 to $18.99
  // Last 2 months are $18.99, before that $16.99
  for (let i = 0; i < 2; i++) {
    const date = subDays(today, i * 30 + 5);
    transactions.push(createTransaction("Netflix", 18.99, date, "streaming"));
  }
  for (let i = 2; i < 6; i++) {
    const date = subDays(today, i * 30 + 5);
    transactions.push(createTransaction("Netflix", 16.99, date, "streaming"));
  }

  // Spotify - Monthly - 2nd - Stable $12.99
  for (let i = 0; i < 6; i++) {
    const date = subDays(today, i * 30 + 15);
    transactions.push(createTransaction("Spotify", 12.99, date, "music"));
  }

  // Adobe - Monthly - 20th - Price Increase from $49.99 to $54.99 (detected in previous step, making it clearer)
  for (let i = 0; i < 2; i++) {
    const date = subDays(today, i * 30 + 2);
    transactions.push(createTransaction("Adobe Creative Cloud", 54.99, date, "software"));
  }
  for (let i = 2; i < 6; i++) {
    const date = subDays(today, i * 30 + 2);
    transactions.push(createTransaction("Adobe Creative Cloud", 49.99, date, "software"));
  }

  // AWS - Monthly - Variable amount (should not trigger price change alert if it varies too much, or logic needs handling)
  // Let's make it slightly variable but not a "step change"
  for (let i = 0; i < 6; i++) {
    const date = subDays(today, i * 30 + 10);
    const amount = 30 + Math.random() * 2;
    transactions.push(createTransaction("AWS Web Services", amount, date, "software"));
  }

  // Random Coffee - Irregular
  for (let i = 0; i < 20; i++) {
    const date = subDays(today, Math.floor(Math.random() * 90));
    transactions.push(createTransaction("Cafe Nervosa", 4.50, date, "coffee"));
  }

  // Gym - Fortnightly - $25.00
  for (let i = 0; i < 12; i++) {
    const date = subDays(today, i * 14 + 1);
    transactions.push(createTransaction("Anytime Fitness", 25.00, date, "fitness"));
  }

  return transactions.sort((a, b) =>
    new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime()
  );
};
