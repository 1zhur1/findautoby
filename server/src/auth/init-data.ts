import crypto from 'node:crypto';
import type { TelegramUser } from '../types.js';

export interface ValidInitData {
  user: TelegramUser;
  authDate: number;
  raw: string;
}

export type InitDataResult =
  | { ok: true; data: ValidInitData }
  | { ok: false; reason: string };

/**
 * Валидация Telegram Mini App initData по официальному алгоритму.
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 *
 * secret_key = HMAC_SHA256(<bot_token>, "WebAppData")
 * hash       = HMAC_SHA256(data_check_string, secret_key)
 */
export function validateInitData(
  initData: string,
  botToken: string,
  maxAgeSec: number,
): InitDataResult {
  if (!initData) return { ok: false, reason: 'empty initData' };
  if (!botToken) return { ok: false, reason: 'bot token is not configured' };

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return { ok: false, reason: 'hash is missing' };

  // Секретный ключ: HMAC_SHA256(bot_token, key="WebAppData")
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken.trim()).digest();

  // Считаем hash по data_check_string. Разные версии клиента по-разному учитывают
  // поле signature, поэтому проверяем оба варианта: без signature и с ним.
  const computeHash = (excludeSignature: boolean): string => {
    const pairs: string[] = [];
    for (const [key, value] of params.entries()) {
      if (key === 'hash') continue;
      if (excludeSignature && key === 'signature') continue;
      pairs.push(`${key}=${value}`);
    }
    pairs.sort();
    return crypto.createHmac('sha256', secretKey).update(pairs.join('\n')).digest('hex');
  };

  const target = Buffer.from(hash, 'hex');
  const matches = (computed: string): boolean => {
    const a = Buffer.from(computed, 'hex');
    return a.length === target.length && crypto.timingSafeEqual(a, target);
  };

  if (!matches(computeHash(true)) && !matches(computeHash(false))) {
    return { ok: false, reason: 'hash mismatch' };
  }

  // Проверка свежести initData
  const authDate = Number(params.get('auth_date') ?? 0);
  if (!authDate) return { ok: false, reason: 'auth_date is missing' };
  const ageSec = Math.floor(Date.now() / 1000) - authDate;
  if (ageSec > maxAgeSec) {
    return { ok: false, reason: 'initData is expired' };
  }

  // Разбор пользователя
  const userRaw = params.get('user');
  if (!userRaw) return { ok: false, reason: 'user is missing' };

  let user: TelegramUser;
  try {
    user = JSON.parse(userRaw) as TelegramUser;
  } catch {
    return { ok: false, reason: 'user is not valid JSON' };
  }
  if (typeof user.id !== 'number' || !user.first_name) {
    return { ok: false, reason: 'user payload is invalid' };
  }

  return { ok: true, data: { user, authDate, raw: initData } };
}
