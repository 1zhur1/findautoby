export const APP_NAME = 'FindAuto';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  SEARCHES: '/searches',
  FAVORITES: '/favorites',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
} as const;

export const TELEGRAM_BOT_NAME = 'FindAutoBot';

export const CURRENCIES = ['USD', 'EUR', 'BYN'] as const;

export const CAR_SOURCES = [
  { id: 'onliner', name: 'Onliner', color: '#3B82F6' },
  { id: 'avby', name: 'AV.BY', color: '#22C55E' },
  { id: 'kufar', name: 'Kufar', color: '#F59E0B' },
] as const;

export const PAGE_TRANSITION_DURATION = 0.3;

export const DEBOUNCE_DELAY = 300;

export const MAX_SEARCHES = 10;

export const MAX_FAVORITES = 50;