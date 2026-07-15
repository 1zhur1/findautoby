import { Router } from 'express';
import { z } from 'zod';
import {
  createSearch,
  deleteSearch,
  getSearch,
  listSearches,
  updateSearch,
} from '../db/searches.js';
import { runSearch, getSearchResults } from '../services/search-runner.js';
import { runSources, type ParserFilters } from '../parsers/index.js';
import type { Source } from '../types.js';

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
  const search = createSearch(req.tgUser!.id, parsed.data);
  res.status(201).json(search);

  // Сразу запускаем парсинг в фоне — чтобы объявления появились без нажатия «Обновить»
  void runSearch(req.tgUser!.id, search.id).catch((e) =>
    console.error('[create-run] ошибка фонового парсинга:', e),
  );
});

// Живой предпросмотр парсинга по произвольным фильтрам (без сохранения)
const previewSchema = z.object({
  brand: z.string().optional(),
  models: z.array(z.string()).optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  currency: z.enum(['USD', 'EUR', 'BYN']).default('USD'),
  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),
  mileageTo: z.number().optional(),
  sources: z.array(z.enum(['onliner', 'kufar', 'avby'])).optional(),
});

searchesRouter.post('/preview', async (req, res) => {
  const parsed = previewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid_body', issues: parsed.error.issues });
    return;
  }
  const { sources, ...rest } = parsed.data;
  const filters = rest as ParserFilters;
  const { cars, perSource } = await runSources(filters, (sources ?? []) as Source[], 20);
  res.json({ total: cars.length, perSource, cars });
});

searchesRouter.get('/:id', (req, res) => {
  const search = getSearch(req.tgUser!.id, req.params.id);
  if (!search) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(search);
});

// Запустить парсинг по сохранённому поиску (сохраняет результаты, создаёт уведомления)
searchesRouter.post('/:id/run', async (req, res) => {
  try {
    const result = await runSearch(req.tgUser!.id, req.params.id);
    res.json(result);
  } catch (error) {
    if ((error as Error).message === 'search_not_found') {
      res.status(404).json({ error: 'not_found' });
      return;
    }
    console.error('[run] ошибка парсинга:', error);
    res.status(502).json({ error: 'parse_failed' });
  }
});

// Сохранённые результаты поиска
searchesRouter.get('/:id/results', (req, res) => {
  const search = getSearch(req.tgUser!.id, req.params.id);
  if (!search) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(getSearchResults(req.params.id));
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
