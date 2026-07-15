import { config } from '../../config.js';
import { getBrowserContext, passSafeline } from '../browser.js';
import type { Car, CarSource, ParserFilters } from '../types.js';
import type { Currency } from '../../types.js';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Форма ответа av.by читается защитно — точную схему нужно подтвердить на сервере,
// где SafeLine реально проходится (см. verify-avby.mjs). При незнакомой форме источник
// просто вернёт пусто и не сломает общий поиск.
interface AvOffer {
  id: number;
  publicUrl?: string;
  price?: { usd?: { amount?: number }; byn?: { amount?: number } };
  metadata?: { title?: string };
  properties?: { name: string; value: string }[];
  photos?: { big?: string; medium?: string }[];
  locality?: { name?: string };
  publishedAt?: string;
}

function prop(offer: AvOffer, name: string): string {
  return offer.properties?.find((p) => p.name === name)?.value ?? '';
}

function toCar(offer: AvOffer): Car {
  const priceUsd = offer.price?.usd?.amount ?? 0;
  return {
    id: `avby:${offer.id}`,
    brand: prop(offer, 'brand') || prop(offer, 'Марка'),
    title: offer.metadata?.title ?? '',
    price: Math.round(priceUsd),
    currency: 'USD' as Currency,
    year: Number(prop(offer, 'year') || prop(offer, 'Год выпуска')) || 0,
    mileage: Number((prop(offer, 'mileage') || prop(offer, 'Пробег')).replace(/\D/g, '')) || 0,
    engineType: prop(offer, 'engine_type') || prop(offer, 'Тип двигателя'),
    engineCapacity: parseFloat(prop(offer, 'engine_capacity') || prop(offer, 'Объём двигателя')) || 0,
    enginePower: 0,
    transmission: prop(offer, 'transmission') || prop(offer, 'Коробка передач'),
    drive: prop(offer, 'drive') || prop(offer, 'Привод'),
    bodyType: prop(offer, 'body_type') || prop(offer, 'Тип кузова'),
    color: prop(offer, 'color') || prop(offer, 'Цвет'),
    doors: 0,
    location: offer.locality?.name ?? '',
    source: 'avby',
    imageUrl: offer.photos?.[0]?.big ?? offer.photos?.[0]?.medium ?? '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: false,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: offer.publishedAt ?? new Date().toISOString(),
    url: offer.publicUrl ?? `https://cars.av.by/${offer.id}`,
  };
}

let loggedShape = false;

/** Достаёт массив офферов из перехваченного JSON (разные возможные ключи). */
function extractOffers(json: any): AvOffer[] {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  return json.offers ?? json.adverts ?? json.data?.offers ?? json.items ?? [];
}

function matches(car: Car, f: ParserFilters): boolean {
  if (f.brand && car.brand && car.brand.toLowerCase() !== f.brand.toLowerCase()) return false;
  const models = (f.models ?? []).map((m) => m.toLowerCase()).filter(Boolean);
  if (models.length && car.title) {
    const t = car.title.toLowerCase();
    if (!models.some((m) => t.includes(m))) return false;
  }
  if (f.priceMin && car.price && car.price < f.priceMin) return false;
  if (f.priceMax && car.price && car.price > f.priceMax) return false;
  if (f.yearFrom && car.year && car.year < f.yearFrom) return false;
  if (f.yearTo && car.year && car.year > f.yearTo) return false;
  if (f.mileageTo && car.mileage > f.mileageTo) return false;
  return true;
}

export const avbySource: CarSource = {
  id: 'avby',
  name: 'AV.BY',

  async search(filters: ParserFilters, limit: number): Promise<Car[]> {
    if (!config.avbyEnabled) return []; // источник включается флагом AVBY_ENABLED

    let page: any;
    try {
      const context = await getBrowserContext();
      page = await context.newPage();

      // Перехватываем JSON-ответы api.av.by с офферами
      const captured: AvOffer[] = [];
      page.on('response', async (resp: any) => {
        const url: string = resp.url();
        if (!/api\.av\.by/i.test(url)) return;
        try {
          const ct = resp.headers()['content-type'] || '';
          if (!ct.includes('json')) return;
          const json = await resp.json();
          const offers = extractOffers(json);
          if (offers.length && !loggedShape) {
            loggedShape = true;
            console.log('[avby] пример оффера (ключи):', Object.keys(offers[0]));
          }
          captured.push(...offers);
        } catch {
          /* ignore */
        }
      });

      await page.goto('https://cars.av.by/filter', { waitUntil: 'domcontentloaded', timeout: 40000 });

      const passed = await passSafeline(page);
      if (!passed) {
        console.warn('[avby] SafeLine не пройден — источник пропущен');
        return [];
      }

      // Даём SPA догрузить офферы
      await page.waitForTimeout(4000);

      // Фолбэк: если XHR не перехватились, пробуем __NEXT_DATA__
      if (!captured.length) {
        const nextData = await page
          .evaluate(() => {
            const doc = (globalThis as any).document;
            const el = doc?.getElementById('__NEXT_DATA__');
            return el ? el.textContent : null;
          })
          .catch(() => null);
        if (nextData) {
          try {
            const parsed = JSON.parse(nextData);
            const deep = parsed?.props?.pageProps ?? parsed?.props ?? parsed;
            captured.push(...extractOffers(deep));
          } catch {
            /* ignore */
          }
        }
      }

      const seen = new Set<string>();
      const results: Car[] = [];
      for (const offer of captured) {
        const car = toCar(offer);
        if (seen.has(car.id)) continue;
        if (!matches(car, filters)) continue;
        seen.add(car.id);
        results.push(car);
        if (results.length >= limit) break;
      }
      return results;
    } catch (error) {
      console.warn('[avby] источник недоступен:', (error as Error).message);
      return [];
    } finally {
      if (page) await page.close().catch(() => {});
    }
  },
};
