import { Router } from 'express';
import { db } from '../db/index.js';

export const statsRouter = Router();

// Минск = UTC+3 (без перехода на летнее время)
const MINSK_OFFSET_MS = 3 * 60 * 60 * 1000;

/** ISO-момент начала сегодняшних суток по Минску (для «Найдено сегодня»). */
function minskTodayStartISO(): string {
  const nowMinsk = new Date(Date.now() + MINSK_OFFSET_MS);
  const midnightUtcOfMinskDate = Date.UTC(
    nowMinsk.getUTCFullYear(),
    nowMinsk.getUTCMonth(),
    nowMinsk.getUTCDate(),
  );
  return new Date(midnightUtcOfMinskDate - MINSK_OFFSET_MS).toISOString();
}

statsRouter.get('/', (req, res) => {
  const userId = req.tgUser!.id;

  const activeSearches = (
    db.prepare('SELECT COUNT(*) AS n FROM searches WHERE user_id = ? AND is_active = 1').get(userId) as {
      n: number;
    }
  ).n;

  const foundToday = (
    db
      .prepare(
        `SELECT COUNT(*) AS n
         FROM search_results r
         JOIN searches s ON s.id = r.search_id
         WHERE s.user_id = ? AND r.first_seen >= ?`,
      )
      .get(userId, minskTodayStartISO()) as { n: number }
  ).n;

  const unreadNotifications = (
    db.prepare('SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? AND is_new = 1').get(userId) as {
      n: number;
    }
  ).n;

  res.json({ activeSearches, foundToday, unreadNotifications });
});
