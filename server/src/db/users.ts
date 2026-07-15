import { db } from './index.js';
import { seedStarterContent } from './seed.js';
import type { Profile, TelegramUser } from '../types.js';

interface UserRow {
  telegram_id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  is_premium: number;
  language: string;
  notifications_enabled: number;
  privacy_mode: number;
  created_at: string;
}

/** Создаёт пользователя при первом обращении и обновляет базовые поля из Telegram. */
export function ensureUser(user: TelegramUser): void {
  const existing = db
    .prepare('SELECT telegram_id FROM users WHERE telegram_id = ?')
    .get(user.id) as { telegram_id: number } | undefined;

  if (existing) {
    db.prepare(
      `UPDATE users
       SET first_name = ?, last_name = ?, username = ?, photo_url = ?, is_premium = ?
       WHERE telegram_id = ?`,
    ).run(
      user.first_name,
      user.last_name ?? '',
      user.username ?? '',
      user.photo_url ?? '',
      user.is_premium ? 1 : 0,
      user.id,
    );
    return;
  }

  db.prepare(
    `INSERT INTO users
       (telegram_id, first_name, last_name, username, photo_url, is_premium, language, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    user.id,
    user.first_name,
    user.last_name ?? '',
    user.username ?? '',
    user.photo_url ?? '',
    user.is_premium ? 1 : 0,
    user.language_code === 'ru' ? 'Русский' : 'English',
    new Date().toISOString(),
  );

  // Наполняем новый аккаунт демо-контентом
  seedStarterContent(user.id);
}

/** Собирает профиль пользователя вместе со статистикой. */
export function getProfile(userId: number): Profile {
  const row = db
    .prepare('SELECT * FROM users WHERE telegram_id = ?')
    .get(userId) as UserRow;

  const searchesCreated = (
    db.prepare('SELECT COUNT(*) AS n FROM searches WHERE user_id = ?').get(userId) as { n: number }
  ).n;
  const notificationsReceived = (
    db.prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id = ?').get(userId) as {
      n: number;
    }
  ).n;

  return {
    firstName: row.first_name,
    lastName: row.last_name,
    username: row.username,
    telegramId: row.telegram_id,
    avatarUrl: row.photo_url,
    premium: row.is_premium === 1,
    searchesCreated,
    notificationsReceived,
    language: row.language,
    notificationsEnabled: row.notifications_enabled === 1,
    privacyMode: row.privacy_mode === 1,
  };
}

/** Обновляет настройки профиля (частично). */
export function updateSettings(
  userId: number,
  patch: Partial<Pick<Profile, 'notificationsEnabled' | 'privacyMode' | 'language'>>,
): Profile {
  if (patch.notificationsEnabled !== undefined) {
    db.prepare('UPDATE users SET notifications_enabled = ? WHERE telegram_id = ?').run(
      patch.notificationsEnabled ? 1 : 0,
      userId,
    );
  }
  if (patch.privacyMode !== undefined) {
    db.prepare('UPDATE users SET privacy_mode = ? WHERE telegram_id = ?').run(
      patch.privacyMode ? 1 : 0,
      userId,
    );
  }
  if (patch.language !== undefined) {
    db.prepare('UPDATE users SET language = ? WHERE telegram_id = ?').run(patch.language, userId);
  }
  return getProfile(userId);
}
