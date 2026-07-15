import { config } from '../config.js';

const API = 'https://api.telegram.org';

export function botConfigured(): boolean {
  return !!config.botToken;
}

/**
 * Отправляет сообщение пользователю в личку от имени бота.
 * Работает только если пользователь уже запускал бота (ограничение Telegram):
 * иначе API вернёт 403 «bot can't initiate conversation with a user».
 * Ошибки не роняют вызывающий код — логируются и возвращают false.
 */
export async function sendMessage(
  chatId: number,
  text: string,
  opts: { disablePreview?: boolean } = {},
): Promise<boolean> {
  if (!config.botToken) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN не задан — сообщение не отправлено');
    return false;
  }
  try {
    const res = await fetch(`${API}/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: opts.disablePreview ?? false,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.warn(`[telegram] sendMessage ${res.status} для chat ${chatId}: ${body.slice(0, 160)}`);
      return false;
    }
    return true;
  } catch (error) {
    console.warn('[telegram] sendMessage ошибка:', (error as Error).message);
    return false;
  }
}

/** Экранирование для parse_mode=HTML. */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
