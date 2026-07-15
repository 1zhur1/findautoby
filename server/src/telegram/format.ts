import { escapeHtml } from './bot.js';
import type { Car, Search } from '../types.js';

const SOURCE_LABEL: Record<string, string> = {
  onliner: 'Onliner',
  kufar: 'Kufar',
  avby: 'AV.BY',
};

const num = (n: number) => n.toLocaleString('ru-RU');

/** Человекочитаемое описание всех фильтров поиска. */
export function describeFilters(s: Search): string {
  const parts: string[] = [];

  const price =
    s.priceMin && s.priceMax
      ? `${num(s.priceMin)}–${num(s.priceMax)} ${s.currency}`
      : s.priceMax
        ? `до ${num(s.priceMax)} ${s.currency}`
        : s.priceMin
          ? `от ${num(s.priceMin)} ${s.currency}`
          : '';
  if (price) parts.push(`💰 ${price}`);

  const year =
    s.yearFrom && s.yearTo
      ? `${s.yearFrom}–${s.yearTo}`
      : s.yearFrom
        ? `от ${s.yearFrom}`
        : s.yearTo
          ? `до ${s.yearTo}`
          : '';
  if (year) parts.push(`📅 ${year} г.`);

  if (s.mileageTo) parts.push(`🛣 до ${num(s.mileageTo)} км`);
  if (s.engineType) parts.push(`⛽ ${s.engineType}`);
  if (s.transmission) parts.push(`⚙️ ${s.transmission}`);
  if (s.drive) parts.push(`🔧 ${s.drive}`);
  if (s.bodyType) parts.push(`🚙 ${s.bodyType}`);
  if (s.color) parts.push(`🎨 ${s.color}`);
  if (s.city) parts.push(`📍 ${s.city}`);
  if (s.sources?.length) {
    parts.push(`🌐 ${s.sources.map((x) => SOURCE_LABEL[x] ?? x).join(', ')}`);
  }

  return parts.map((p) => escapeHtml(p)).join('\n');
}

/** Сводка после проверки поиска. */
export function formatSearchSummary(search: Search, count: number): string {
  const title = [search.brand, search.model].filter(Boolean).join(' ') || 'Автомобиль';
  const filters = describeFilters(search);
  return (
    `🔎 По вашему запросу <b>${escapeHtml(title)}</b>\n` +
    (filters ? `${filters}\n` : '') +
    `\nнайдено <b>${count}</b> ${plural(count, 'объявление', 'объявления', 'объявлений')}.`
  );
}

/** Сообщение об одном найденном авто. */
export function formatCar(car: Car): string {
  const specs = [
    car.year ? `${car.year} г.` : '',
    car.mileage ? `${num(car.mileage)} км` : '',
    car.engineType ? `${car.engineType}${car.engineCapacity ? ` ${car.engineCapacity} л` : ''}` : '',
    car.transmission,
    car.drive,
  ]
    .filter(Boolean)
    .join(' · ');

  const where = [car.location, SOURCE_LABEL[car.source] ?? car.source].filter(Boolean).join(' · ');

  return (
    `🚗 Мы нашли новую машину по вашим характеристикам\n\n` +
    `<b>${escapeHtml(car.title)}</b>\n` +
    `💰 <b>${num(car.price)} ${car.currency}</b>\n` +
    (specs ? `${escapeHtml(specs)}\n` : '') +
    (where ? `📍 ${escapeHtml(where)}\n` : '') +
    `\n${escapeHtml(car.url)}`
  );
}

function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}
