import type { Car, Currency, Source } from '../types.js';

/** Нормализованные фильтры поиска, общие для всех площадок. */
export interface ParserFilters {
  brand?: string;
  models?: string[];
  priceMin?: number;
  priceMax?: number;
  currency: Currency;
  yearFrom?: number;
  yearTo?: number;
  mileageTo?: number;
  transmission?: string;
  bodyType?: string;
  engineType?: string;
}

/** Единый интерфейс площадки-источника. */
export interface CarSource {
  readonly id: Source;
  readonly name: string;
  /** Возвращает нормализованные объявления по фильтрам (не более limit). */
  search(filters: ParserFilters, limit: number): Promise<Car[]>;
}

export type { Car };
