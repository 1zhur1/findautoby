import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@store';
import { getColorScheme, isTelegramMiniApp, onColorSchemeChange } from '@shared/lib/telegram';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode, setMode } = useThemeStore();

  // Внутри Telegram следуем за темой клиента и реагируем на её смену
  useEffect(() => {
    if (!isTelegramMiniApp()) return;

    setMode(getColorScheme());
    const unsubscribe = onColorSchemeChange(setMode);
    return unsubscribe;
  }, [setMode]);

  // Применяем текущий режим к корню документа
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
}
