export interface Car {
  id: string;
  brand: string;
  title: string;
  price: number;
  currency: 'USD' | 'EUR' | 'BYN';
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
  source: 'onliner' | 'avby' | 'kufar';
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

export const cars: Car[] = [
  {
    id: '1',
    brand: 'BMW',
    title: 'BMW 320i G20',
    price: 42500,
    currency: 'USD',
    year: 2022,
    mileage: 18500,
    engineType: 'Бензин',
    engineCapacity: 2.0,
    enginePower: 184,
    transmission: 'Автомат',
    drive: 'Задний',
    bodyType: 'Седан',
    color: 'Черный',
    doors: 4,
    location: 'Минск',
    source: 'onliner',
    imageUrl: '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: true,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: '2026-07-14T10:30:00Z',
    url: '#',
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    title: 'Mercedes-Benz E 200',
    price: 52300,
    currency: 'EUR',
    year: 2023,
    mileage: 9200,
    engineType: 'Бензин',
    engineCapacity: 2.0,
    enginePower: 197,
    transmission: 'Автомат',
    drive: 'Задний',
    bodyType: 'Седан',
    color: 'Белый',
    doors: 4,
    location: 'Минск',
    source: 'avby',
    imageUrl: '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: true,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: '2026-07-13T15:00:00Z',
    url: '#',
  },
  {
    id: '3',
    brand: 'Audi',
    title: 'Audi A6 C8',
    price: 48700,
    currency: 'USD',
    year: 2021,
    mileage: 34000,
    engineType: 'Дизель',
    engineCapacity: 3.0,
    enginePower: 245,
    transmission: 'Автомат',
    drive: 'Полный',
    bodyType: 'Седан',
    color: 'Синий',
    doors: 4,
    location: 'Минск',
    source: 'kufar',
    imageUrl: '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: false,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: '2026-07-12T09:00:00Z',
    url: '#',
  },
  {
    id: '4',
    brand: 'Volkswagen',
    title: 'Volkswagen Golf 8',
    price: 28500,
    currency: 'EUR',
    year: 2023,
    mileage: 5100,
    engineType: 'Бензин',
    engineCapacity: 1.5,
    enginePower: 150,
    transmission: 'Робот',
    drive: 'Передний',
    bodyType: 'Хэтчбек',
    color: 'Красный',
    doors: 5,
    location: 'Гродно',
    source: 'onliner',
    imageUrl: '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: true,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: '2026-07-11T11:30:00Z',
    url: '#',
  },
  {
    id: '5',
    brand: 'Tesla',
    title: 'Tesla Model 3',
    price: 38900,
    currency: 'USD',
    year: 2022,
    mileage: 22000,
    engineType: 'Электро',
    engineCapacity: 0,
    enginePower: 283,
    transmission: 'Автомат',
    drive: 'Задний',
    bodyType: 'Седан',
    color: 'Белый',
    doors: 4,
    location: 'Минск',
    source: 'onliner',
    imageUrl: '',
    hasAccidents: false,
    isOriginalMileage: true,
    isOneOwner: true,
    isCommercialAccount: false,
    isUrgentSale: false,
    createdAt: '2026-07-10T14:00:00Z',
    url: '#',
  },
];