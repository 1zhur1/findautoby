import { config } from '../config.js';
import { db } from '../db/index.js';
import { runSearch } from './search-runner.js';

// Периодическая проверка активных поисков: раз в N минут прогоняем runSearch по каждому.
// runSearch сам определяет новые объявления, пишет уведомления и шлёт их в личку Telegram.

let running = false;
let timer: ReturnType<typeof setInterval> | null = null;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface SearchRef {
  id: string;
  user_id: number;
}

async function runCycle(): Promise<void> {
  if (running) {
    console.warn('[scheduler] предыдущий цикл ещё выполняется — пропускаю');
    return;
  }
  running = true;
  const started = Date.now();
  try {
    const rows = db
      .prepare('SELECT id, user_id FROM searches WHERE is_active = 1 ORDER BY updated_at ASC')
      .all() as SearchRef[];

    if (!rows.length) {
      running = false;
      return;
    }
    console.log(`[scheduler] проверяю ${rows.length} активных поисков`);

    let totalAdded = 0;
    for (const { id, user_id } of rows) {
      try {
        const result = await runSearch(user_id, id);
        totalAdded += result.added;
      } catch (error) {
        console.error(`[scheduler] поиск ${id}:`, (error as Error).message);
      }
      // Пауза между поисками — щадим внешние площадки
      await delay(1500);
    }

    const sec = Math.round((Date.now() - started) / 1000);
    console.log(`[scheduler] цикл завершён за ${sec}с, новых объявлений: ${totalAdded}`);
  } finally {
    running = false;
  }
}

/** Запускает периодическую проверку (первый цикл — через интервал, не на старте). */
export function startScheduler(): void {
  if (!config.schedulerEnabled) {
    console.log('[scheduler] отключён (SCHEDULER_ENABLED=false)');
    return;
  }
  const minutes = config.schedulerIntervalMin;
  const ms = Math.max(1, minutes) * 60 * 1000;
  timer = setInterval(() => void runCycle(), ms);
  console.log(`[scheduler] запущен: проверка активных поисков каждые ${minutes} мин`);
}

export function stopScheduler(): void {
  if (timer) clearInterval(timer);
  timer = null;
}
