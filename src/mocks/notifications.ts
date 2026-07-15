export interface Notification {
  id: string;
  carId: string;
  carTitle: string;
  price: number;
  currency: 'USD' | 'EUR' | 'BYN';
  source: 'onliner' | 'avby' | 'kufar';
  message: string;
  isNew: boolean;
  createdAt: string;
  imageUrl: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    carId: '1',
    carTitle: 'BMW 320i G20',
    price: 42500,
    currency: 'USD',
    source: 'onliner',
    message: 'Новое объявление по вашему поиску',
    isNew: true,
    createdAt: '2026-07-15T07:00:00Z',
    imageUrl: '',
  },
  {
    id: '2',
    carId: '2',
    carTitle: 'Mercedes-Benz E 200',
    price: 52300,
    currency: 'EUR',
    source: 'avby',
    message: 'Цена снижена на 2000€',
    isNew: true,
    createdAt: '2026-07-14T18:30:00Z',
    imageUrl: '',
  },
  {
    id: '3',
    carId: '3',
    carTitle: 'Audi A6 C8',
    price: 48700,
    currency: 'USD',
    source: 'kufar',
    message: 'Новое объявление по вашему поиску',
    isNew: false,
    createdAt: '2026-07-14T10:00:00Z',
    imageUrl: '',
  },
  {
    id: '4',
    carId: '4',
    carTitle: 'Volkswagen Golf 8',
    price: 28500,
    currency: 'EUR',
    source: 'onliner',
    message: 'Новое объявление по вашему поиску',
    isNew: false,
    createdAt: '2026-07-13T15:00:00Z',
    imageUrl: '',
  },
  {
    id: '5',
    carId: '5',
    carTitle: 'Tesla Model 3',
    price: 38900,
    currency: 'USD',
    source: 'onliner',
    message: 'Цена снижена на 1500$',
    isNew: false,
    createdAt: '2026-07-12T09:00:00Z',
    imageUrl: '',
  },
];