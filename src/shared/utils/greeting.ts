/**
 * Приветствие по времени суток. Время ВСЕГДА берётся по Минску (Europe/Minsk),
 * независимо от часового пояса устройства пользователя.
 *
 * 06:00–11:00 — утро · 11:00–17:00 — день · 17:00–22:00 — вечер · 22:00–06:00 — ночь
 */
export function getMinskHour(date: Date = new Date()): number {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Minsk',
    hour: '2-digit',
    hourCycle: 'h23',
  }).format(date);
  return Number(hour);
}

export function getGreeting(date: Date = new Date()): string {
  const hour = getMinskHour(date);
  if (hour >= 6 && hour < 11) return 'Доброе утро';
  if (hour >= 11 && hour < 17) return 'Добрый день';
  if (hour >= 17 && hour < 22) return 'Добрый вечер';
  return 'Доброй ночи';
}
