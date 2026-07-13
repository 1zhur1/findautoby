import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@store';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
}