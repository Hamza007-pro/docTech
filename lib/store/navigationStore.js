import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNavigationStore = create(
  persist(
    (set) => ({
      navigateTo: 0,
      currentTab: 0,
      setNavigateTo: (index) => set({ navigateTo: index }),
      setCurrentTab: (index) => set({ currentTab: index }),
    }),
    {
      name: 'navigation-store',
    }
  )
);

export default useNavigationStore;
