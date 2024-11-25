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
      name: 'history', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
