import { TransactionResponse, TransactionResource } from "@/types/transaction";
import { generateMockTransactions } from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  transactions: {
    list: async (): Promise<TransactionResponse> => {
      await delay(800);
      const data = generateMockTransactions();
      return {
        data,
        links: {
          prev: null,
          next: null,
        },
      };
    },
    get: async (id: string): Promise<TransactionResource | null> => {
        await delay(300);
        const data = generateMockTransactions().find(t => t.id === id);
        return data || null;
    }
  },
};
