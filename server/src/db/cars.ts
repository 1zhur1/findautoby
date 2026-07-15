import { db } from './index.js';
import type { Car } from '../types.js';

export function upsertCar(car: Car): void {
  db.prepare('INSERT OR REPLACE INTO cars (id, data) VALUES (?, ?)').run(
    car.id,
    JSON.stringify(car),
  );
}

export function getCar(id: string): Car | undefined {
  const row = db.prepare('SELECT data FROM cars WHERE id = ?').get(id) as
    | { data: string }
    | undefined;
  return row ? (JSON.parse(row.data) as Car) : undefined;
}

export function listCars(): Car[] {
  const rows = db.prepare('SELECT data FROM cars').all() as { data: string }[];
  return rows.map((r) => JSON.parse(r.data) as Car);
}
