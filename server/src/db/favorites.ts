import { db } from './index.js';
import type { Car } from '../types.js';

/** Избранные авто пользователя (новые сверху). */
export function listFavorites(userId: number): Car[] {
  const rows = db
    .prepare(
      `SELECT c.data AS data
       FROM favorites f
       JOIN cars c ON c.id = f.car_id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
    )
    .all(userId) as { data: string }[];
  return rows.map((r) => JSON.parse(r.data) as Car);
}

export function listFavoriteIds(userId: number): string[] {
  const rows = db
    .prepare('SELECT car_id FROM favorites WHERE user_id = ?')
    .all(userId) as { car_id: string }[];
  return rows.map((r) => r.car_id);
}

/** Добавляет авто в избранное. Возвращает false, если такого авто нет в каталоге. */
export function addFavorite(userId: number, carId: string): boolean {
  const car = db.prepare('SELECT id FROM cars WHERE id = ?').get(carId);
  if (!car) return false;
  db.prepare(
    'INSERT OR IGNORE INTO favorites (user_id, car_id, created_at) VALUES (?, ?, ?)',
  ).run(userId, carId, new Date().toISOString());
  return true;
}

export function removeFavorite(userId: number, carId: string): boolean {
  const info = db
    .prepare('DELETE FROM favorites WHERE user_id = ? AND car_id = ?')
    .run(userId, carId);
  return info.changes > 0;
}
