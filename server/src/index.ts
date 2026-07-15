import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { initSchema } from './db/index.js';
import { seedCars } from './db/seed.js';
import { authMiddleware } from './auth/middleware.js';
import { startScheduler } from './services/scheduler.js';
import { meRouter } from './routes/me.js';
import { searchesRouter } from './routes/searches.js';
import { carsRouter } from './routes/cars.js';
import { favoritesRouter } from './routes/favorites.js';
import { notificationsRouter } from './routes/notifications.js';

// Инициализация БД и наполнение каталога авто
initSchema();
seedCars();

const app = express();

app.use(
  cors({
    origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(',').map((s) => s.trim()),
  }),
);
app.use(express.json());

// Публичный health-check (без авторизации)
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', insecureAuth: config.allowInsecureAuth });
});

// Все /api/* защищены авторизацией по Telegram initData
app.use('/api', authMiddleware);
app.use('/api/me', meRouter);
app.use('/api/searches', searchesRouter);
app.use('/api/cars', carsRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/notifications', notificationsRouter);

// 404 для неизвестных маршрутов
app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' });
});

// Централизованный обработчик ошибок
app.use(
  (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[error]', err);
    res.status(500).json({ error: 'internal_error' });
  },
);

app.listen(config.port, () => {
  console.log(`[server] FindAuto API запущен на http://localhost:${config.port}`);
  console.log(`[server] Health: http://localhost:${config.port}/api/health`);
  if (config.allowInsecureAuth) {
    console.log('[server] Режим разработки: авторизация без initData разрешена (DEV_USER).');
  }
  startScheduler();
});
