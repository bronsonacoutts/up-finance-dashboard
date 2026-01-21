import { create } from 'zustand';
import { Subscription } from '@/types/subscription';
import { detectSubscriptions } from './utils';
import { api } from '@/services/api';

interface SubscriptionState {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
  scanForSubscriptions: () => Promise<void>;
  markAsPaused: (id: string) => void;
  removeSubscription: (id: string) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: [],
  isLoading: false,
  error: null,

  scanForSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch all transactions (simulated)
      const response = await api.transactions.list();
      const transactions = response.data;

      const detected = detectSubscriptions(transactions);

      // Merge with existing manual subscriptions if any (not implemented yet)
      // For now, just replace
      set({ subscriptions: detected, isLoading: false });
    } catch (err) {
      set({
        error: 'Failed to scan for subscriptions',
        isLoading: false
      });
      console.error(err);
    }
  },

  markAsPaused: (id: string) => {
    set(state => ({
      subscriptions: state.subscriptions.map(sub =>
        sub.id === id ? { ...sub, status: 'PAUSED' } : sub
      )
    }));
  },

  removeSubscription: (id: string) => {
    set(state => ({
      subscriptions: state.subscriptions.filter(sub => sub.id !== id)
    }));
  }
}));
