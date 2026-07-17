import { botConfigured, sendMessage, sendPhoto } from './bot.js';
import { formatSearchSummary, formatCar } from './format.js';
import type { Car, Search } from '../types.js';

const PER_CAR_CAP = 10; // не заваливаем личку и не ловим 429 от Telegram
const GAP_MS = 1200; // пауза между сообщениями одному пользователю

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Отправляет по каждому авто отдельное сообщение: фото с подписью,
 * а если картинки нет/Telegram её не принял — обычный текст со ссылкой.
 */
export async function sendCarMessages(userId: number, cars: Car[]): Promise<void> {
  if (!botConfigured()) return;
  for (const car of cars.slice(0, PER_CAR_CAP)) {
    const text = formatCar(car);
    const sentAsPhoto = car.imageUrl ? await sendPhoto(userId, car.imageUrl, text) : false;
    if (!sentAsPhoto) await sendMessage(userId, text);
    await delay(GAP_MS);
  }
}

/**
 * Полное уведомление о результатах поиска:
 * 1) сводка «найдено N»; 2) если поиск активен — по сообщению на каждое авто.
 */
export async function notifySearchResults(
  userId: number,
  search: Search,
  cars: Car[],
): Promise<void> {
  if (!botConfigured()) return;
  await sendMessage(userId, formatSearchSummary(search, cars.length));
  if (search.isActive) {
    await sendCarMessages(userId, cars);
  }
}
