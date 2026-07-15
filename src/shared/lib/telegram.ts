/**
 * Обёртка над Telegram WebApp SDK (telegram-web-app.js).
 * Скрипт подключается в index.html, поэтому здесь мы работаем с window.Telegram.WebApp.
 * Все функции безопасны для запуска вне Telegram (например, в обычном браузере при разработке).
 */

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  is_premium?: boolean;
}

export type TelegramColorScheme = 'light' | 'dark';

interface TelegramBackButton {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  onClick: (cb: () => void) => void;
  offClick: (cb: () => void) => void;
}

interface TelegramHapticFeedback {
  impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  selectionChanged: () => void;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: { user?: TelegramUser };
  version: string;
  platform: string;
  colorScheme: TelegramColorScheme;
  themeParams: Record<string, string>;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  BackButton: TelegramBackButton;
  HapticFeedback: TelegramHapticFeedback;
  ready: () => void;
  expand: () => void;
  close: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableVerticalSwipes?: () => void;
  onEvent: (event: string, cb: () => void) => void;
  offEvent: (event: string, cb: () => void) => void;
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

/** Возвращает объект WebApp, если приложение открыто внутри Telegram. */
export function getWebApp(): TelegramWebApp | null {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp ?? null;
}

/** Открыто ли приложение как Telegram Mini App. */
export function isTelegramMiniApp(): boolean {
  const wa = getWebApp();
  // initData непустой только в реальном окружении Telegram
  return !!wa && wa.initData.length > 0;
}

/** Текущий пользователь Telegram (или null вне Telegram). */
export function getTelegramUser(): TelegramUser | null {
  return getWebApp()?.initDataUnsafe?.user ?? null;
}

/** Подписанная строка initData для валидации на бэкенде. */
export function getTelegramInitData(): string | null {
  const data = getWebApp()?.initData;
  return data && data.length > 0 ? data : null;
}

/** Тема, заданная клиентом Telegram (по умолчанию dark). */
export function getColorScheme(): TelegramColorScheme {
  return getWebApp()?.colorScheme ?? 'dark';
}

/**
 * Инициализация Mini App: сообщаем Telegram о готовности, разворачиваем на весь экран,
 * настраиваем цвета шапки/фона и запрет случайного закрытия свайпом.
 * Безопасно вызывать вне Telegram — просто ничего не произойдёт.
 */
export function initTelegram(): void {
  const wa = getWebApp();
  if (!wa) return;

  wa.ready();
  wa.expand();

  // Совпадает с фоном приложения (bg-zinc-950)
  try {
    wa.setHeaderColor('#09090b');
    wa.setBackgroundColor('#09090b');
  } catch {
    /* старые версии клиента могут не поддерживать */
  }

  // Не даём случайно закрыть приложение вертикальным свайпом
  wa.disableVerticalSwipes?.();
}

/** Подписка на смену темы в клиенте Telegram. Возвращает функцию отписки. */
export function onColorSchemeChange(cb: (scheme: TelegramColorScheme) => void): () => void {
  const wa = getWebApp();
  if (!wa) return () => {};

  const handler = () => cb(wa.colorScheme);
  wa.onEvent('themeChanged', handler);
  return () => wa.offEvent('themeChanged', handler);
}

/** Управление нативной кнопкой «Назад». */
export const backButton = {
  show(onClick: () => void): () => void {
    const wa = getWebApp();
    if (!wa) return () => {};
    wa.BackButton.onClick(onClick);
    wa.BackButton.show();
    return () => {
      wa.BackButton.offClick(onClick);
      wa.BackButton.hide();
    };
  },
  hide(): void {
    getWebApp()?.BackButton.hide();
  },
};

/** Тактильная отдача (безопасна вне Telegram). */
export const haptic = {
  impact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light'): void {
    getWebApp()?.HapticFeedback.impactOccurred(style);
  },
  notification(type: 'error' | 'success' | 'warning'): void {
    getWebApp()?.HapticFeedback.notificationOccurred(type);
  },
  selection(): void {
    getWebApp()?.HapticFeedback.selectionChanged();
  },
};
