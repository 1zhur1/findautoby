import type { Request, Response, NextFunction } from 'express';
import { config } from '../config.js';
import { validateInitData } from './init-data.js';
import { ensureUser } from '../db/users.js';
import type { TelegramUser } from '../types.js';

// Расширяем Request полем с пользователем
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tgUser?: TelegramUser;
    }
  }
}

// Пользователь по умолчанию для локальной разработки без Telegram
const DEV_USER: TelegramUser = {
  id: 123456789,
  first_name: 'Арсений',
  last_name: 'Иванов',
  username: 'arseny',
  language_code: 'ru',
  is_premium: false,
};

/**
 * Аутентификация по Telegram initData.
 * Заголовок: Authorization: tma <initData>
 *
 * В режиме ALLOW_INSECURE_AUTH=true при отсутствии/невалидности initData
 * используется DEV_USER — чтобы фронтенд работал локально без бота.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.header('authorization') ?? '';
  const [scheme, initData] = header.split(' ');

  if (scheme === 'tma' && initData) {
    const result = validateInitData(initData, config.botToken, config.initDataMaxAgeSec);
    if (result.ok) {
      req.tgUser = result.data.user;
      ensureUser(result.data.user);
      next();
      return;
    }
    // initData передан, но невалиден
    if (!config.allowInsecureAuth) {
      res.status(401).json({ error: 'unauthorized', reason: result.reason });
      return;
    }
  } else if (!config.allowInsecureAuth) {
    res.status(401).json({ error: 'unauthorized', reason: 'missing initData' });
    return;
  }

  // Небезопасный режим разработки
  req.tgUser = DEV_USER;
  ensureUser(DEV_USER);
  next();
}
