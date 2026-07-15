import 'dotenv/config';

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
}

export const config = {
  port: Number(process.env.PORT ?? 8000),
  botToken: process.env.TELEGRAM_BOT_TOKEN ?? '',
  allowInsecureAuth: bool(process.env.ALLOW_INSECURE_AUTH, false),
  initDataMaxAgeSec: Number(process.env.INIT_DATA_MAX_AGE_SEC ?? 86400),
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  databasePath: process.env.DATABASE_PATH ?? './data/findauto.db',
  isProduction: process.env.NODE_ENV === 'production',
  // Парсинг av.by через headless-браузер (обход SafeLine WAF). По умолчанию выключен —
  // требует patchright + `npx patchright install chromium` и проверки на сервере.
  avbyEnabled: bool(process.env.AVBY_ENABLED, false),
  avbyHeadful: bool(process.env.AVBY_HEADFUL, false),
  // Прокси для av.by (если IP сервера блокируется). Формат: http://user:pass@host:port или socks5://host:port
  avbyProxy: process.env.AVBY_PROXY ?? '',
  // Периодическая проверка активных поисков (24/7)
  schedulerEnabled: bool(process.env.SCHEDULER_ENABLED, true),
  schedulerIntervalMin: Number(process.env.SCHEDULER_INTERVAL_MIN ?? 10),
} as const;

// Предупреждаем о небезопасной конфигурации на старте
if (!config.botToken && !config.allowInsecureAuth) {
  console.warn(
    '[config] TELEGRAM_BOT_TOKEN не задан и ALLOW_INSECURE_AUTH=false — авторизация будет отклонять все запросы.',
  );
}
if (config.allowInsecureAuth && config.isProduction) {
  console.warn(
    '[config] ВНИМАНИЕ: ALLOW_INSECURE_AUTH=true в production — это небезопасно, включите валидацию initData.',
  );
}
