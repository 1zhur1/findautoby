export interface Search {
  id: string;
  brand: string;
  model: string;
  generation?: string;
  priceMin?: number;
  priceMax: number;
  currency: 'USD' | 'EUR' | 'BYN';
  yearFrom?: number;
  yearTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  engineType?: string;
  engineCapacityFrom?: number;
  engineCapacityTo?: number;
  enginePowerFrom?: number;
  enginePowerTo?: number;
  transmission?: string;
  drive?: string;
  bodyType?: string;
  doors?: number;
  color?: string;
  country?: string;
  region?: string;
  city?: string;
  radius?: number;
  sources: string[];
  vinRequired: boolean;
  noAccidents: boolean;
  originalMileage: boolean;
  oneOwner: boolean;
  notDamaged: boolean;
  noCommercialAccount: boolean;
  notUrgentSale: boolean;
  onlyWithPhotos: boolean;
  onlyNew: boolean;
  isActive: boolean;
  foundCount: number;
  lastCheckedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const searches: Search[] = [
  {
    id: '1',
    brand: 'BMW',
    model: '3 серия',
    generation: 'G20',
    priceMin: 30000,
    priceMax: 65000,
    currency: 'USD',
    yearFrom: 2019,
    yearTo: 2024,
    mileageTo: 50000,
    engineType: 'Бензин',
    transmission: 'Автомат',
    drive: 'Задний',
    bodyType: 'Седан',
    color: 'Черный',
    city: 'Минск',
    sources: ['onliner', 'avby'],
    vinRequired: false,
    noAccidents: true,
    originalMileage: true,
    oneOwner: false,
    notDamaged: true,
    noCommercialAccount: true,
    notUrgentSale: false,
    onlyWithPhotos: true,
    onlyNew: false,
    isActive: true,
    foundCount: 14,
    lastCheckedAt: '2026-07-15T07:00:00Z',
    createdAt: '2026-07-10T10:00:00Z',
    updatedAt: '2026-07-15T07:00:00Z',
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'E-Класс',
    generation: 'W214',
    priceMin: 40000,
    priceMax: 80000,
    currency: 'USD',
    yearFrom: 2020,
    yearTo: 2024,
    mileageTo: 30000,
    engineType: 'Дизель',
    transmission: 'Автомат',
    drive: 'Задний',
    bodyType: 'Седан',
    city: 'Минск',
    sources: ['onliner', 'avby', 'kufar'],
    vinRequired: false,
    noAccidents: true,
    originalMileage: true,
    oneOwner: true,
    notDamaged: true,
    noCommercialAccount: true,
    notUrgentSale: true,
    onlyWithPhotos: true,
    onlyNew: false,
    isActive: true,
    foundCount: 8,
    lastCheckedAt: '2026-07-15T06:00:00Z',
    createdAt: '2026-07-08T14:00:00Z',
    updatedAt: '2026-07-15T06:00:00Z',
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'A6',
    generation: 'C8',
    priceMax: 55000,
    currency: 'EUR',
    yearFrom: 2018,
    yearTo: 2023,
    transmission: 'Автомат',
    drive: 'Полный',
    city: 'Минская область',
    sources: ['onliner', 'kufar'],
    vinRequired: false,
    noAccidents: false,
    originalMileage: false,
    oneOwner: false,
    notDamaged: false,
    noCommercialAccount: false,
    notUrgentSale: false,
    onlyWithPhotos: false,
    onlyNew: false,
    isActive: false,
    foundCount: 23,
    lastCheckedAt: '2026-07-14T12:00:00Z',
    createdAt: '2026-07-05T09:00:00Z',
    updatedAt: '2026-07-14T12:00:00Z',
  },
];