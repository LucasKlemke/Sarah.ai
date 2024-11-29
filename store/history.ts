import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useHistoryStore = create(
  persist(
    (set, get:any) => ({
      history: [],
      setHistory: (history: { id: string; content: any[] }) =>
        set({ history: history }),
      removeHistory: (id: string) =>
        set({ history: get().history.filter((item:any) => item.id !== id) }),
    }),
    {
      name: 'history', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
