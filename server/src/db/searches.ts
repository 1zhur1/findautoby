import { randomUUID } from 'node:crypto';
import { db } from './index.js';
import type { Search } from '../types.js';

interface Row {
  data: string;
}

/** Список поисков пользователя (новые сверху). */
export function listSearches(userId: number): Search[] {
  const rows = db
    .prepare('SELECT data FROM searches WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId) as Row[];
  return rows.map((r) => JSON.parse(r.data) as Search);
}

export function getSearch(userId: number, id: string): Search | undefined {
  const row = db
    .prepare('SELECT data FROM searches WHERE user_id = ? AND id = ?')
    .get(userId, id) as Row | undefined;
  return row ? (JSON.parse(row.data) as Search) : undefined;
}

/** Поля, которые клиент может задать при создании поиска. */
export type SearchInput = Partial<Omit<Search, 'id' | 'createdAt' | 'updatedAt' | 'foundCount' | 'lastCheckedAt'>>;

const DEFAULTS = {
  brand: '', model: '', priceMax: 0, currency: 'USD' as const, sources: [] as string[],
  vinRequired: false, noAccidents: false, originalMileage: false, oneOwner: false,
  notDamaged: false, noCommercialAccount: false, notUrgentSale: false, onlyWithPhotos: false,
  onlyNew: false, isActive: true,
};

export function createSearch(userId: number, input: SearchInput): Search {
  const now = new Date().toISOString();
  const search: Search = {
    ...DEFAULTS,
    ...input,
    id: randomUUID(),
    foundCount: 0,
    lastCheckedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `INSERT INTO searches (id, user_id, is_active, created_at, updated_at, data)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(search.id, userId, search.isActive ? 1 : 0, now, now, JSON.stringify(search));

  return search;
}

export function updateSearch(
  userId: number,
  id: string,
  patch: SearchInput,
): Search | undefined {
  const current = getSearch(userId, id);
  if (!current) return undefined;

  const updated: Search = {
    ...current,
    ...patch,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };

  db.prepare(
    'UPDATE searches SET is_active = ?, updated_at = ?, data = ? WHERE user_id = ? AND id = ?',
  ).run(updated.isActive ? 1 : 0, updated.updatedAt, JSON.stringify(updated), userId, id);

  return updated;
}

export function deleteSearch(userId: number, id: string): boolean {
  const info = db
    .prepare('DELETE FROM searches WHERE user_id = ? AND id = ?')
    .run(userId, id);
  return info.changes > 0;
}
