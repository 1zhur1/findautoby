import type { Car, Notification, Search } from '../types.js';

/** Глобальный каталог автомобилей (сид). */
export const cars: Car[] = [
  {
    id: '1', brand: 'BMW', title: 'BMW 320i G20', price: 42500, currency: 'USD', year: 2022,
    mileage: 18500, engineType: 'Бензин', engineCapacity: 2.0, enginePower: 184, transmission: 'Автомат',
    drive: 'Задний', bodyType: 'Седан', color: 'Черный', doors: 4, location: 'Минск', source: 'onliner',
    imageUrl: '', hasAccidents: false, isOriginalMileage: true, isOneOwner: true, isCommercialAccount: false,
    isUrgentSale: false, createdAt: '2026-07-14T10:30:00Z', url: '#',
  },
  {
    id: '2', brand: 'Mercedes-Benz', title: 'Mercedes-Benz E 200', price: 52300, currency: 'EUR', year: 2023,
    mileage: 9200, engineType: 'Бензин', engineCapacity: 2.0, enginePower: 197, transmission: 'Автомат',
    drive: 'Задний', bodyType: 'Седан', color: 'Белый', doors: 4, location: 'Минск', source: 'avby',
    imageUrl: '', hasAccidents: false, isOriginalMileage: true, isOneOwner: true, isCommercialAccount: false,
    isUrgentSale: false, createdAt: '2026-07-13T15:00:00Z', url: '#',
  },
  {
    id: '3', brand: 'Audi', title: 'Audi A6 C8', price: 48700, currency: 'USD', year: 2021,
    mileage: 34000, engineType: 'Дизель', engineCapacity: 3.0, enginePower: 245, transmission: 'Автомат',
    drive: 'Полный', bodyType: 'Седан', color: 'Синий', doors: 4, location: 'Минск', source: 'kufar',
    imageUrl: '', hasAccidents: false, isOriginalMileage: true, isOneOwner: false, isCommercialAccount: false,
    isUrgentSale: false, createdAt: '2026-07-12T09:00:00Z', url: '#',
  },
  {
    id: '4', brand: 'Volkswagen', title: 'Volkswagen Golf 8', price: 28500, currency: 'EUR', year: 2023,
    mileage: 5100, engineType: 'Бензин', engineCapacity: 1.5, enginePower: 150, transmission: 'Робот',
    drive: 'Передний', bodyType: 'Хэтчбек', color: 'Красный', doors: 5, location: 'Гродно', source: 'onliner',
    imageUrl: '', hasAccidents: false, isOriginalMileage: true, isOneOwner: true, isCommercialAccount: false,
    isUrgentSale: false, createdAt: '2026-07-11T11:30:00Z', url: '#',
  },
  {
    id: '5', brand: 'Tesla', title: 'Tesla Model 3', price: 38900, currency: 'USD', year: 2022,
    mileage: 22000, engineType: 'Электро', engineCapacity: 0, enginePower: 283, transmission: 'Автомат',
    drive: 'Задний', bodyType: 'Седан', color: 'Белый', doors: 4, location: 'Минск', source: 'onliner',
    imageUrl: '', hasAccidents: false, isOriginalMileage: true, isOneOwner: true, isCommercialAccount: false,
    isUrgentSale: false, createdAt: '2026-07-10T14:00:00Z', url: '#',
  },
];

/** Стартовые поиски для нового пользователя. */
export const searches: Search[] = [
  {
    id: '1', brand: 'BMW', model: '3 серия', generation: 'G20', priceMin: 30000, priceMax: 65000,
    currency: 'USD', yearFrom: 2019, yearTo: 2024, mileageTo: 50000, engineType: 'Бензин',
    transmission: 'Автомат', drive: 'Задний', bodyType: 'Седан', color: 'Черный', city: 'Минск',
    sources: ['onliner', 'avby'], vinRequired: false, noAccidents: true, originalMileage: true,
    oneOwner: false, notDamaged: true, noCommercialAccount: true, notUrgentSale: false, onlyWithPhotos: true,
    onlyNew: false, isActive: true, foundCount: 14, lastCheckedAt: '2026-07-15T07:00:00Z',
    createdAt: '2026-07-10T10:00:00Z', updatedAt: '2026-07-15T07:00:00Z',
  },
  {
    id: '2', brand: 'Mercedes-Benz', model: 'E-Класс', generation: 'W214', priceMin: 40000, priceMax: 80000,
    currency: 'USD', yearFrom: 2020, yearTo: 2024, mileageTo: 30000, engineType: 'Дизель',
    transmission: 'Автомат', drive: 'Задний', bodyType: 'Седан', city: 'Минск',
    sources: ['onliner', 'avby', 'kufar'], vinRequired: false, noAccidents: true, originalMileage: true,
    oneOwner: true, notDamaged: true, noCommercialAccount: true, notUrgentSale: true, onlyWithPhotos: true,
    onlyNew: false, isActive: true, foundCount: 8, lastCheckedAt: '2026-07-15T06:00:00Z',
    createdAt: '2026-07-08T14:00:00Z', updatedAt: '2026-07-15T06:00:00Z',
  },
  {
    id: '3', brand: 'Audi', model: 'A6', generation: 'C8', priceMax: 55000, currency: 'EUR',
    yearFrom: 2018, yearTo: 2023, transmission: 'Автомат', drive: 'Полный', city: 'Минская область',
    sources: ['onliner', 'kufar'], vinRequired: false, noAccidents: false, originalMileage: false,
    oneOwner: false, notDamaged: false, noCommercialAccount: false, notUrgentSale: false, onlyWithPhotos: false,
    onlyNew: false, isActive: false, foundCount: 23, lastCheckedAt: '2026-07-14T12:00:00Z',
    createdAt: '2026-07-05T09:00:00Z', updatedAt: '2026-07-14T12:00:00Z',
  },
];

/** Стартовые уведомления для нового пользователя. */
export const notifications: Notification[] = [
  { id: '1', carId: '1', carTitle: 'BMW 320i G20', price: 42500, currency: 'USD', source: 'onliner', message: 'Новое объявление по вашему поиску', isNew: true, createdAt: '2026-07-15T07:00:00Z', imageUrl: '' },
  { id: '2', carId: '2', carTitle: 'Mercedes-Benz E 200', price: 52300, currency: 'EUR', source: 'avby', message: 'Цена снижена на 2000€', isNew: true, createdAt: '2026-07-14T18:30:00Z', imageUrl: '' },
  { id: '3', carId: '3', carTitle: 'Audi A6 C8', price: 48700, currency: 'USD', source: 'kufar', message: 'Новое объявление по вашему поиску', isNew: false, createdAt: '2026-07-14T10:00:00Z', imageUrl: '' },
  { id: '4', carId: '4', carTitle: 'Volkswagen Golf 8', price: 28500, currency: 'EUR', source: 'onliner', message: 'Новое объявление по вашему поиску', isNew: false, createdAt: '2026-07-13T15:00:00Z', imageUrl: '' },
  { id: '5', carId: '5', carTitle: 'Tesla Model 3', price: 38900, currency: 'USD', source: 'onliner', message: 'Цена снижена на 1500$', isNew: false, createdAt: '2026-07-12T09:00:00Z', imageUrl: '' },
];

/** Избранные авто (id) по умолчанию. */
export const favoriteCarIds: string[] = ['1', '2'];
