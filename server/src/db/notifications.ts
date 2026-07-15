import { db } from './index.js';
import type { Notification } from '../types.js';

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
