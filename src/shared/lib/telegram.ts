/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export function getTelegramUser(): TelegramUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const tg = (window as any).Telegram;
    return tg?.WebApp?.initDataUnsafe?.user ?? null;
  } catch {
    return null;
  }
}

export function getTelegramInitData(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const tg = (window as any).Telegram;
    return tg?.WebApp?.initData ?? null;
  } catch {
    return null;
  }
}

export function isTelegramMiniApp(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return !!(window as any).Telegram?.WebApp;
  } catch {
    return false;
  }
}