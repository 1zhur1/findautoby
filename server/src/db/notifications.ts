import { randomUUID } from 'node:crypto';
import { db } from './index.js';
import type { Car, Notification } from '../types.js';

/** Создаёт уведомление о новом найденном авто. */
export function createCarNotification(userId: number, car: Car, message: string): void {
  const notif: Notification = {
    id: randomUUID(),
    carId: car.id,
    carTitle: car.title,
    price: car.price,
    currency: car.currency,
    source: car.source,
    message,
    isNew: true,
    createdAt: new Date().toISOString(),
    imageUrl: car.imageUrl,
    url: car.url,
  };
  db.prepare(
    'INSERT INTO notifications (id, user_id, is_new, created_at, data) VALUES (?, ?, 1, ?, ?)',
  ).run(notif.id, userId, notif.createdAt, JSON.stringify(notif));
}

/** Уведомления пользователя (новые сверху). */
export function listNotifications(userId: number): Notification[] {
  const rows = db
    .prepare('SELECT is_new, data FROM notifications WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId) as { is_new: number; data: string }[];
  return rows.map((r) => {
    const n = JSON.parse(r.data) as Notification;
    // is_new — источник истины из колонки
    n.isNew = r.is_new === 1;
    return n;
  });
}

export function unreadCount(userId: number): number {
  return (
    db
      .prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? AND is_new = 1')
      .get(userId) as { n: number }
  ).n;
}

/** Помечает одно уведомление прочитанным. */
export function markRead(userId: number, id: string): boolean {
  const info = db
    .prepare('UPDATE notifications SET is_new = 0 WHERE user_id = ? AND id = ?')
    .run(userId, id);
  return info.changes > 0;
}

/** Помечает все уведомления пользователя прочитанными. */
export function markAllRead(userId: number): void {
  db.prepare('UPDATE notifications SET is_new = 0 WHERE user_id = ?').run(userId);
}
