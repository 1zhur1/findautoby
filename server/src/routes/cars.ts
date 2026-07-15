import { Router } from 'express';
import { getCar, listCars } from '../db/cars.js';
import { listFavoriteIds } from '../db/favorites.js';

export const carsRouter = Router();

// Список авто. Помечаем, какие из них в избранном у текущего пользователя.
carsRouter.get('/', (req, res) => {
  const favorites = new Set(listFavoriteIds(req.tgUser!.id));
  const cars = listCars().map((car) => ({ ...car, isFavorite: favorites.has(car.id) }));
  res.json(cars);
});

carsRouter.get('/:id', (req, res) => {
  const car = getCar(req.params.id);
  if (!car) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  const favorites = new Set(listFavoriteIds(req.tgUser!.id));
  res.json({ ...car, isFavorite: favorites.has(car.id) });
});
