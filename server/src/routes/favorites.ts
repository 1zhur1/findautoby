import { Router } from 'express';
import { addFavorite, listFavorites, removeFavorite } from '../db/favorites.js';

export const favoritesRouter = Router();

favoritesRouter.get('/', (req, res) => {
  res.json(listFavorites(req.tgUser!.id));
});

favoritesRouter.post('/:carId', (req, res) => {
  const ok = addFavorite(req.tgUser!.id, req.params.carId);
  if (!ok) {
    res.status(404).json({ error: 'car_not_found' });
    return;
  }
  res.status(201).json({ carId: req.params.carId, isFavorite: true });
});

favoritesRouter.delete('/:carId', (req, res) => {
  const ok = removeFavorite(req.tgUser!.id, req.params.carId);
  if (!ok) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.status(204).end();
});
