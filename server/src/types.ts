export type Currency = 'USD' | 'EUR' | 'BYN';
export type Source = 'onliner' | 'avby' | 'kufar';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  is_premium?: boolean;
}

export interface Car {
  id: string;
  brand: string;
  title: string;
  price: number;
  currency: Currency;
  year: number;
  mileage: number;
  engineType: string;
  engineCapacity: number;
  enginePower: number;
  transmission: string;
  drive: string;
  bodyType: string;
  color: string;
  doors: number;
  location: string;
  source: Source;
  imageUrl: string;
  vin?: string;
  hasAccidents: boolean;
  isOriginalMileage: boolean;
  isOneOwner: boolean;
  isCommercialAccount: boolean;
  isUrgentSale: boolean;
  createdAt: string;
  url: string;
}

export interface Search {
  id: string;
  brand: string;
  model: string;
  generation?: string;
  priceMin?: number;
  priceMax: number;
  currency: Currency;
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

export interface Notification {
  id: string;
  carId: string;
  carTitle: string;
  price: number;
  currency: Currency;
  source: Source;
  message: string;
  isNew: boolean;
  createdAt: string;
  imageUrl: string;
  /** Ссылка на объявление на площадке */
  url?: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  telegramId: number;
  avatarUrl: string;
  premium: boolean;
  searchesCreated: number;
  notificationsReceived: number;
  language: string;
  notificationsEnabled: boolean;
  privacyMode: boolean;
}
