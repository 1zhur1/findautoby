import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config.js';

// Гарантируем существование директории для файла БД
const dbDir = path.dirname(config.databasePath);
if (dbDir && !fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(config.databasePath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/** Создаёт таблицы, если их ещё нет. */
export function initSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id           INTEGER PRIMARY KEY,
      first_name            TEXT NOT NULL,
      last_name             TEXT NOT NULL DEFAULT '',
      username              TEXT NOT NULL DEFAULT '',
      photo_url             TEXT NOT NULL DEFAULT '',
      is_premium            INTEGER NOT NULL DEFAULT 0,
      language              TEXT NOT NULL DEFAULT 'Русский',
      notifications_enabled INTEGER NOT NULL DEFAULT 1,
      privacy_mode          INTEGER NOT NULL DEFAULT 0,
      created_at            TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cars (
      id   TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS searches (
      id         TEXT PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(telegram_id) ON DELETE CASCADE,
      is_active  INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      data       TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_searches_user ON searches(user_id);

    CREATE TABLE IF NOT EXISTS favorites (
      user_id    INTEGER NOT NULL REFERENCES users(telegram_id) ON DELETE CASCADE,
      car_id     TEXT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, car_id)
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id         TEXT PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(telegram_id) ON DELETE CASCADE,
      is_new     INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      data       TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
  `);
}
