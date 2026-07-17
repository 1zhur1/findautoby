import type { Car } from '../types.js';
import type { ParserFilters } from './types.js';

/** Нормализация для сравнения: регистр, ё→е, лишние пробелы. */
const norm = (s: string): string =>
  s.toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').trim();

/**
 * Текстовое совпадение: значение авто содержит искомое.
 * Учитывает составные метки площадок («Серый / серебристый» подходит под «Серый»)
 * и «Автоматическая» под «Автомат».
 */
function textMatches(carValue: string | undefined, filterValue: string | undefined): boolean {
  if (!filterValue) return true; // фильтр не задан — пропускаем
  if (!carValue) return false; // фильтр задан, а данных нет — не подходит
  return norm(carValue).includes(norm(filterValue));
}

const minOk = (value: number, min?: number): boolean => min === undefined || value >= min;
const maxOk = (value: number, max?: number): boolean => max === undefined || value <= max;

function brandMatches(car: Car, brand?: string): boolean {
  if (!brand) return true;
  const b = norm(brand);
  // У некоторых площадок (Kufar) марка отдельным полем не приходит — ищем в заголовке
  if (car.brand) return norm(car.brand) === b;
  return norm(car.title).includes(b);
}

function modelsMatch(car: Car, models?: string[]): boolean {
  const list = (models ?? []).filter(Boolean);
  if (!list.length) return true;
  const title = norm(car.title);
  return list.some((m) => title.includes(norm(m)));
}

/**
 * Единая проверка авто по всем фильтрам поиска.
 * Используется всеми источниками — так фильтры работают одинаково везде.
 */
export function matchesFilters(car: Car, f: ParserFilters): boolean {
  if (!brandMatches(car, f.brand)) return false;
  if (!modelsMatch(car, f.models)) return false;

  // Цена (уже приведена к валюте поиска)
  if (!minOk(car.price, f.priceMin) || !maxOk(car.price, f.priceMax)) return false;

  // Год / пробег
  if (!minOk(car.year, f.yearFrom) || !maxOk(car.year, f.yearTo)) return false;
  if (!minOk(car.mileage, f.mileageFrom) || !maxOk(car.mileage, f.mileageTo)) return false;

  // Двигатель
  if (!textMatches(car.engineType, f.engineType)) return false;
  if (!minOk(car.engineCapacity, f.engineCapacityFrom)) return false;
  if (!maxOk(car.engineCapacity, f.engineCapacityTo)) return false;
  if (!minOk(car.enginePower, f.enginePowerFrom)) return false;
  if (!maxOk(car.enginePower, f.enginePowerTo)) return false;

  // Трансмиссия / привод / кузов / цвет
  if (!textMatches(car.transmission, f.transmission)) return false;
  if (!textMatches(car.drive, f.drive)) return false;
  if (!textMatches(car.bodyType, f.bodyType)) return false;
  if (!textMatches(car.color, f.color)) return false;

  // Город (у площадок в location может быть город или регион)
  if (!textMatches(car.location, f.city)) return false;

  // Двери (проверяем, только если площадка их отдала)
  if (f.doors !== undefined && car.doors > 0 && car.doors !== f.doors) return false;

  return true;
}
