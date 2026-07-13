import { create } from 'zustand';
import type { ThemeMode } from '@shared/types';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  setMode: (mode) => {
    set({ mode });
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(mode);
  },
  toggle: () =>
    set((state) => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(newMode);
      return { mode: newMode };
    }),
}));