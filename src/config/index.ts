export const config = {
  app: {
    name: 'FindAuto',
    version: '1.0.0',
    description: 'Telegram Mini App for car search',
  },
  api: {
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4245/api',
    timeout: 15000,
  },
  telegram: {
    botName: import.meta.env.VITE_TELEGRAM_BOT_NAME ?? 'FindAutoBot',
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 50,
  },
  debounce: {
    search: 300,
    input: 150,
  },
} as const;