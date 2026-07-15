import type { Car, CarSource, ParserFilters } from './types.js';
import type { Search, Source } from '../types.js';
import { onlinerSource } from './sources/onliner.js';
import { kufarSource } from './sources/kufar.js';
import { avbySource } from './sources/avby.js';

export type { ParserFilters, CarSource };

/** Все доступные источники. */
export const SOURCES: Record<Source, CarSource> = {
  onliner: onlinerSource,
  kufar: kufarSource,
  avby: avbySource,
};

/** Преобразует сохранённый поиск в нормализованные фильтры парсеров. */
export function searchToFilters(search: Search): ParserFilters {
  const models = search.model
    ? search.model.split(',').map((m) => m.trim()).filter(Boolean)
    : [];
  return {
    brand: search.brand || undefined,
    models,
    priceMin: search.priceMin,
    priceMax: search.priceMax || undefined,
    currency: search.currency,
    yearFrom: search.yearFrom,
    yearTo: search.yearTo,
    mileageTo: search.mileageTo,
    transmission: search.transmission,
    bodyType: search.bodyType,
    engineType: search.engineType,
  };
}

export interface SourceRunResult {
  source: Source;
  ok: boolean;
  count: number;
  error?: string;
}

export interface AggregateResult {
  cars: Car[];
  perSource: SourceRunResult[];
}

/**
 * Запускает выбранные источники параллельно, объединяет и дедуплицирует результаты.
 * Падение одного источника не роняет остальные.
 */
export async function runSources(
  filters: ParserFilters,
  sourceIds: Source[],
  limitPerSource = 30,
): Promise<AggregateResult> {
  const active = sourceIds.length ? sourceIds : (Object.keys(SOURCES) as Source[]);

  const settled = await Promise.all(
    active.map(async (id): Promise<{ cars: Car[]; result: SourceRunResult }> => {
      const source = SOURCES[id];
      if (!source) {
        return { cars: [], result: { source: id, ok: false, count: 0, error: 'unknown source' } };
      }
      try {
        const cars = await source.search(filters, limitPerSource);
        return { cars, result: { source: id, ok: true, count: cars.length } };
      } catch (error) {
        return {
          cars: [],
          result: { source: id, ok: false, count: 0, error: (error as Error).message },
        };
      }
    }),
  );

  // Дедупликация по id (source:externalId)
  const seen = new Set<string>();
  const cars: Car[] = [];
  for (const { cars: sourceCars } of settled) {
    for (const car of sourceCars) {
      if (seen.has(car.id)) continue;
      seen.add(car.id);
      cars.push(car);
    }
  }
  // Новые сверху
  cars.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return { cars, perSource: settled.map((s) => s.result) };
}
