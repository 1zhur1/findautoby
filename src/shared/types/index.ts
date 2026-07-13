export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  telegramId: number;
}

export interface Car {
  id: string;
  title: string;
  price: number;
  currency: 'USD' | 'EUR' | 'BYN';
  year: number;
  mileage: number;
  engineType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  engineCapacity: number;
  transmission: 'manual' | 'automatic';
  driveType: 'front' | 'rear' | 'all';
  bodyType: string;
  color: string;
  images: string[];
  location: string;
  source: 'onliner' | 'avby' | 'kufar';
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  phone?: string;
  sellerName?: string;
}

export interface SearchFilter {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  brands?: string[];
  models?: string[];
  engineTypes?: string[];
  transmission?: string[];
  bodyTypes?: string[];
  sources?: string[];
  locations?: string[];
  minMileage?: number;
  maxMileage?: number;
}

export interface Search {
  id: string;
  name: string;
  filter: SearchFilter;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  foundCount: number;
  lastCheckedAt?: string;
}

export interface Notification {
  id: string;
  type: 'new_car' | 'price_drop' | 'search_complete' | 'system';
  title: string;
  message: string;
  carId?: string;
  searchId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export type ThemeMode = 'dark' | 'light';

export type PageAnimation = 'fade' | 'slide-up' | 'slide-left' | 'slide-right';