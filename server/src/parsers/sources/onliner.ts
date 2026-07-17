import { fetchJson } from '../http.js';
import { matchesFilters } from '../match.js';
import type { Car, CarSource, ParserFilters } from '../types.js';
import type { Currency } from '../../types.js';

const BASE = 'https://ab.onliner.by/sdapi/ab.api';
const MAX_PAGES = 10; // до ~500 свежих объявлений за проход

// Примечание: GET-эндпоинт Onliner отдаёт только ленту новых объявлений и
// не поддерживает серверную фильтрацию по query-параметрам, поэтому фильтруем
// на нашей стороне. Для сценария «новые объявления» это оптимально.

// --- Маппинг значений Onliner → русские подписи ---
const ENGINE: Record<string, string> = {
  gasoline: 'Бензин', diesel: 'Дизель', electric: 'Электро', hybrid: 'Гибрид', lpg: 'Газ', gas: 'Газ',
};
const TRANSMISSION: Record<string, string> = {
  automatic: 'Автомат', manual: 'Механика', mechanical: 'Механика', robot: 'Робот', variator: 'Вариатор',
};
const DRIVE: Record<string, string> = {
  front: 'Передний', rear: 'Задний', full: 'Полный', all: 'Полный',
};
const BODY: Record<string, string> = {
  sedan: 'Седан', hatchback: 'Хэтчбек', liftback: 'Лифтбек', universal: 'Универсал', wagon: 'Универсал',
  coupe: 'Купе', cabriolet: 'Кабриолет', suv: 'Внедорожник', crossover: 'Внедорожник',
  minivan: 'Минивэн', van: 'Минивэн', pickup: 'Пикап',
};
const COLOR: Record<string, string> = {
  white: 'Белый', black: 'Черный', silver: 'Серебристый', gray: 'Серый', grey: 'Серый',
  blue: 'Синий', red: 'Красный', green: 'Зеленый', yellow: 'Желтый', orange: 'Оранжевый',
  brown: 'Коричневый', beige: 'Бежевый', gold: 'Золотистый', purple: 'Фиолетовый',
};
const map = (dict: Record<string, string>, v: unknown) =>
  (typeof v === 'string' && dict[v]) || (typeof v === 'string' ? v : '');

interface Money {
  amount: string;
  currency: string;
  converted?: Record<string, { amount: string; currency: string }>;
}
interface OnlinerAdvert {
  id: number;
  title: string;
  manufacturer?: { name: string };
  model?: { name: string };
  specs: {
    transmission?: string;
    color?: string;
    odometer?: { value: number };
    year?: number;
    engine?: { type?: string; capacity?: number; power?: { value?: number } };
    body_type?: string;
    drivetrain?: string;
  };
  price?: Money;
  location?: { city?: { name: string } };
  images?: { original?: string }[];
  created_at?: string;
  html_url?: string;
}
interface OnlinerResponse {
  adverts: OnlinerAdvert[];
  total: number;
  page: { current: number; last: number };
}

/** Цена в нужной валюте (Onliner отдаёт конвертацию). */
function priceIn(money: Money | undefined, currency: Currency): { value: number; currency: Currency } {
  if (!money) return { value: 0, currency };
  const conv = money.converted?.[currency];
  if (conv) return { value: Math.round(Number(conv.amount)), currency };
  return { value: Math.round(Number(money.amount)), currency: (money.currency as Currency) ?? currency };
}

function toCar(a: OnlinerAdvert, currency: Currency): Car {
  const price = priceIn(a.price, currency);
  return {
    id: `onliner:${a.id}`,
    brand: a.manufacturer?.name ?? '',
    title: a.title,
    price: price.value,
    currency: price.currency,
    year: a.specs.year ?? 0,
    mileage: a.specs.odometer?.value ?? 0,
    engineType: map(ENGINE, a.specs.engine?.type),
    engineCapacity: a.specs.engine?.capacity ?? 0,
    enginePower: a.specs.engine?.power?.value ?? 0,
    transmission: map(TRANSMISSION, a.specs.transmission),
    drive: map(DRIVE, a.specs.drivetrain),
    bodyType: map(BODY, a.specs.body_type),
    color: map(COLOR, a.specs.color),
    doors: 0,
    location: a.location?.city?.name ?? '',
    source: 'onliner',
    imageUrl: a.images?.[0]?.original ?? '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: false,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: a.created_at ?? new Date().toISOString(),
    url: a.html_url ?? `https://ab.onliner.by/${a.id}`,
  };
}

export const onlinerSource: CarSource = {
  id: 'onliner',
  name: 'Onliner Автобарахолка',

  async search(filters: ParserFilters, limit: number): Promise<Car[]> {
    const currency = filters.currency ?? 'USD';
    const results: Car[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const data = await fetchJson<OnlinerResponse>(
        `${BASE}/search/vehicles?currency=${currency.toLowerCase()}&page=${page}`,
      );
      lastPage = data.page?.last ?? 1;

      for (const advert of data.adverts ?? []) {
        const car = toCar(advert, currency);
        if (matchesFilters(car, filters)) {
          results.push(car);
          if (results.length >= limit) return results;
        }
      }
      page++;
    } while (page <= lastPage && page <= MAX_PAGES);

    return results;
  },
};
