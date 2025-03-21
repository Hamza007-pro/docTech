import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  navigateTo: number;
  currentTab: string;
  setNavigateTo: (navigateTo: number) => void;
  setCurrentTab: (currentTab: string) => void;
  reset: () => void;
}

const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      navigateTo: 0,
      currentTab: '0', // Initialize with '0' to match the string index
      setNavigateTo: (navigateTo) => set({ navigateTo }),
      setCurrentTab: (currentTab) => set({ currentTab }),
      reset: () => set({ navigateTo: 0, currentTab: '0' }) // Reset function for navigation
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
