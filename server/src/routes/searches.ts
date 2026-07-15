import { Router } from 'express';
import { z } from 'zod';
import {
  createSearch,
  deleteSearch,
  getSearch,
  listSearches,
  updateSearch,
} from '../db/searches.js';

export const searchesRouter = Router();

// Схема входных данных поиска. Все поля опциональны; лишние игнорируются.
const searchInputSchema = z
  .object({
    brand: z.string(),
    model: z.string(),
    generation: z.string(),
    priceMin: z.number(),
    priceMax: z.number(),
    currency: z.enum(['USD', 'EUR', 'BYN']),
    yearFrom: z.number(),
    yearTo: z.number(),
    mileageFrom: z.number(),
    mileageTo: z.number(),
    engineType: z.string(),
    engineCapacityFrom: z.number(),
    engineCapacityTo: z.number(),
    enginePowerFrom: z.number(),
    enginePowerTo: z.number(),
    transmission: z.string(),
    drive: z.string(),
    bodyType: z.string(),
    doors: z.number(),
    color: z.string(),
    country: z.string(),
    region: z.string(),
    city: z.string(),
    radius: z.number(),
    sources: z.array(z.string()),
    vinRequired: z.boolean(),
    noAccidents: z.boolean(),
    originalMileage: z.boolean(),
    oneOwner: z.boolean(),
    notDamaged: z.boolean(),
    noCommercialAccount: z.boolean(),
    notUrgentSale: z.boolean(),
    onlyWithPhotos: z.boolean(),
    onlyNew: z.boolean(),
    isActive: z.boolean(),
  })
  .partial();

searchesRouter.get('/', (req, res) => {
  res.json(listSearches(req.tgUser!.id));
});

searchesRouter.post('/', (req, res) => {
  const parsed = searchInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid_body', issues: parsed.error.issues });
    return;
  }
  res.status(201).json(createSearch(req.tgUser!.id, parsed.data));
});

searchesRouter.get('/:id', (req, res) => {
  const search = getSearch(req.tgUser!.id, req.params.id);
  if (!search) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(search);
});

searchesRouter.patch('/:id', (req, res) => {
  const parsed = searchInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid_body', issues: parsed.error.issues });
    return;
  }
  const updated = updateSearch(req.tgUser!.id, req.params.id, parsed.data);
  if (!updated) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(updated);
});

searchesRouter.delete('/:id', (req, res) => {
  const ok = deleteSearch(req.tgUser!.id, req.params.id);
  if (!ok) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.status(204).end();
});
