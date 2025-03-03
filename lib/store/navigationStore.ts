import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  navigateTo: number;
  currentTab: string;
  setNavigateTo: (navigateTo: number) => void;
  setCurrentTab: (currentTab: string) => void;
}

const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      navigateTo: 0,
      currentTab: 'all', // Default to 'all' slug
      setNavigateTo: (navigateTo) => set({ 
        navigateTo,
        currentTab: 'all' // Reset to 'all' when changing category
      }),
      setCurrentTab: (currentTab) => set({ currentTab })
    }),
    {
      name: 'navigation-store',
      partialize: (state) => ({
        navigateTo: state.navigateTo,
        currentTab: state.currentTab
      }),
    }
  )
);

export default useNavigationStore;