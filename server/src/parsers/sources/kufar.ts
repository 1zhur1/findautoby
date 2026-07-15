import { fetchJson } from '../http.js';
import type { Car, CarSource, ParserFilters } from '../types.js';

const BASE = 'https://api.kufar.by/search-api/v2/search/rendered-paginated';
const CARS_CATEGORY = '2010';

interface AdParameter {
  p: string; // код параметра
  v: string | number; // значение
  vl: string; // человекочитаемая подпись
}
interface KufarAd {
  ad_id: number;
  ad_link: string;
  subject: string;
  price_usd: string; // в копейках (÷100)
  price_byn: string;
  ad_parameters: AdParameter[];
  images?: { path: string; media_storage: string }[];
  list_time: string;
}
interface KufarResponse {
  ads: KufarAd[];
  total: number;
}

function param(ad: KufarAd, code: string): AdParameter | undefined {
  return ad.ad_parameters?.find((p) => p.p === code);
}

const normalizeGearbox = (v: string): string => {
  if (/автомат/i.test(v)) return 'Автомат';
  if (/механ/i.test(v)) return 'Механика';
  if (/робот/i.test(v)) return 'Робот';
  if (/вариатор/i.test(v)) return 'Вариатор';
  return v;
};

// URL картинки Kufar из media_storage/path
function imageUrl(ad: KufarAd): string {
  const img = ad.images?.find((i) => i.path);
  if (!img) return '';
  return `https://rms.kufar.by/v1/gallery/${img.path}`;
}

function toCar(ad: KufarAd): Car {
  const year = Number(param(ad, 'regdate')?.v ?? 0);
  const mileage = Number(param(ad, 'mileage')?.v ?? 0);
  const capacityLabel = param(ad, 'cars_capacity')?.vl ?? ''; // "1.5 л"
  const capacity = parseFloat(capacityLabel) || 0;

  return {
    id: `kufar:${ad.ad_id}`,
    brand: '',
    title: ad.subject,
    price: Math.round(Number(ad.price_usd ?? 0) / 100),
    currency: 'USD',
    year,
    mileage,
    engineType: param(ad, 'cars_engine')?.vl ?? '',
    engineCapacity: capacity,
    enginePower: 0,
    transmission: normalizeGearbox(param(ad, 'cars_gearbox')?.vl ?? ''),
    drive: param(ad, 'cars_drive')?.vl ?? '',
    bodyType: param(ad, 'cars_type')?.vl ?? '',
    color: param(ad, 'cars_color')?.vl ?? '',
    doors: 0,
    location: param(ad, 'area')?.vl ?? param(ad, 'region')?.vl ?? '',
    source: 'kufar',
    imageUrl: imageUrl(ad),
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: false,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: ad.list_time,
    url: ad.ad_link,
  };
}

export const kufarSource: CarSource = {
  id: 'kufar',
  name: 'Kufar Авто',

  async search(filters: ParserFilters, limit: number): Promise<Car[]> {
    const params = new URLSearchParams();
    params.set('cat', CARS_CATEGORY);
    params.set('lang', 'ru');
    params.set('cur', 'USD');
    params.set('sort', 'lst.d'); // новые сверху
    params.set('size', String(Math.min(limit, 30)));

    // Текстовый запрос: марка + модели
    const queryParts = [filters.brand, ...(filters.models ?? [])].filter(Boolean);
    if (queryParts.length) params.set('query', queryParts.join(' '));

    // Диапазон цены (в единицах cur)
    if (filters.priceMin || filters.priceMax) {
      const from = filters.priceMin ?? 0;
      const to = filters.priceMax ?? 100000000;
      params.set('prc', `r:${from},${to}`);
    }

    const data = await fetchJson<KufarResponse>(`${BASE}?${params.toString()}`, {
      headers: { origin: 'https://auto.kufar.by', referer: 'https://auto.kufar.by/' },
    });

    const results: Car[] = [];
    for (const ad of data.ads ?? []) {
      const car = toCar(ad);
      // Клиентская фильтрация по году и пробегу
      if (filters.yearFrom && car.year && car.year < filters.yearFrom) continue;
      if (filters.yearTo && car.year && car.year > filters.yearTo) continue;
      if (filters.mileageTo && car.mileage > filters.mileageTo) continue;
      results.push(car);
      if (results.length >= limit) break;
    }
    return results;
  },
};
