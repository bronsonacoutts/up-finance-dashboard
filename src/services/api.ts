import { TransactionResponse, TransactionResource } from "@/types/transaction";
import { generateMockTransactions } from "./mockData";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Cache mock data to avoid regeneration on every call and ensure data stability
const MOCK_DATA = generateMockTransactions();

export const api = {
  transactions: {
    list: async (): Promise<TransactionResponse> => {
      await delay(800);
      return {
        data: MOCK_DATA,
        links: {
          prev: null,
          next: null,
        },
      };
    },
    get: async (id: string): Promise<TransactionResource | null> => {
        await delay(300);
        const data = MOCK_DATA.find(t => t.id === id);
        return data || null;
    }
  },
};
