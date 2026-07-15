import { randomUUID } from 'node:crypto';
import { db, initSchema } from './index.js';
import { upsertCar } from './cars.js';
import { cars, searches, notifications, favoriteCarIds } from '../data/seed-data.js';
import type { Search } from '../types.js';

/** Заливает глобальный каталог авто (идемпотентно). */
export function seedCars(): void {
  const tx = db.transaction(() => {
    for (const car of cars) upsertCar(car);
  });
  tx();
}

/**
 * Наполняет аккаунт пользователя стартовым контентом (поиски, уведомления, избранное),
 * но только если у него ещё нет поисков — чтобы не дублировать при каждом входе.
 */
export function seedStarterContent(userId: number): void {
  const has = (
    db.prepare('SELECT COUNT(*) AS n FROM searches WHERE user_id = ?').get(userId) as { n: number }
  ).n;
  if (has > 0) return;

  const tx = db.transaction(() => {
    for (const s of searches) {
      const search: Search = { ...s, id: randomUUID() };
      db.prepare(
        `INSERT INTO searches (id, user_id, is_active, created_at, updated_at, data)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(
        search.id,
        userId,
        search.isActive ? 1 : 0,
        search.createdAt,
        search.updatedAt,
        JSON.stringify(search),
      );
    }

    for (const n of notifications) {
      const notif = { ...n, id: randomUUID() };
      db.prepare(
        'INSERT INTO notifications (id, user_id, is_new, created_at, data) VALUES (?, ?, ?, ?, ?)',
      ).run(notif.id, userId, notif.isNew ? 1 : 0, notif.createdAt, JSON.stringify(notif));
    }

    for (const carId of favoriteCarIds) {
      db.prepare(
        'INSERT OR IGNORE INTO favorites (user_id, car_id, created_at) VALUES (?, ?, ?)',
      ).run(userId, carId, new Date().toISOString());
    }
  });
  tx();
}

// Позволяет прогнать сид вручную: `npm run seed`
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  initSchema();
  seedCars();
  console.log(`[seed] Каталог авто загружен: ${cars.length} шт.`);
  process.exit(0);
}
