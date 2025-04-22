import { create } from 'zustand';

interface NavigationState {
  navigateTo: number;
  currentTab: string;
  setNavigateTo: (navigateTo: number) => void;
  setCurrentTab: (tab: string) => void;
  reset: () => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
  navigateTo: 0,
  currentTab: '0',
  setNavigateTo: (navigateTo) => set({ navigateTo }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  reset: () => set({ navigateTo: 0, currentTab: '0' })
}));

export default useNavigationStore;
