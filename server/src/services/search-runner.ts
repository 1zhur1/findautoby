import { db } from '../db/index.js';
import { upsertCar } from '../db/cars.js';
import { getSearch, touchSearchStats } from '../db/searches.js';
import { createCarNotification } from '../db/notifications.js';
import { runSources, searchToFilters, type SourceRunResult } from '../parsers/index.js';
import type { Car, Source } from '../types.js';

const MAX_NOTIFICATIONS_PER_RUN = 10;

export interface SearchRunResult {
  searchId: string;
  total: number; // всего найдено в этом проходе
  added: number; // новых (не встречались раньше)
  perSource: SourceRunResult[];
  cars: Car[];
}

/**
 * Запускает поиск по его настройкам: парсит выбранные площадки, сохраняет авто,
 * определяет новинки и создаёт по ним уведомления (кроме самого первого прохода).
 */
export async function runSearch(userId: number, searchId: string): Promise<SearchRunResult> {
  const search = getSearch(userId, searchId);
  if (!search) throw new Error('search_not_found');

  const filters = searchToFilters(search);
  const { cars, perSource } = await runSources(filters, search.sources as Source[], 30);

  // Какие car_id уже были в результатах этого поиска
  const existingRows = db
    .prepare('SELECT car_id FROM search_results WHERE search_id = ?')
    .all(searchId) as { car_id: string }[];
  const existing = new Set(existingRows.map((r) => r.car_id));
  const isFirstRun = existing.size === 0;

  const now = new Date().toISOString();
  const newCars: Car[] = [];

  const persist = db.transaction(() => {
    for (const car of cars) {
      upsertCar(car);
      const isNew = !existing.has(car.id);
      if (isNew) newCars.push(car);
      db.prepare(
        'INSERT OR IGNORE INTO search_results (search_id, car_id, first_seen) VALUES (?, ?, ?)',
      ).run(searchId, car.id, now);
    }
  });
  persist();

  // Уведомления только со второго прохода (первый — «посев» без спама)
  if (!isFirstRun) {
    for (const car of newCars.slice(0, MAX_NOTIFICATIONS_PER_RUN)) {
      createCarNotification(userId, car, 'Новое объявление по вашему поиску');
    }
  }

  // Обновляем счётчик и время последней проверки
  const totalFound = (
    db.prepare('SELECT COUNT(*) AS n FROM search_results WHERE search_id = ?').get(searchId) as {
      n: number;
    }
  ).n;
  touchSearchStats(userId, searchId, totalFound);

  return { searchId, total: cars.length, added: newCars.length, perSource, cars };
}

/** Возвращает сохранённые результаты поиска (новые сверху). */
export function getSearchResults(searchId: string): Car[] {
  const rows = db
    .prepare(
      `SELECT c.data AS data
       FROM search_results r
       JOIN cars c ON c.id = r.car_id
       WHERE r.search_id = ?
       ORDER BY r.first_seen DESC`,
    )
    .all(searchId) as { data: string }[];
  return rows.map((r) => JSON.parse(r.data) as Car);
}
