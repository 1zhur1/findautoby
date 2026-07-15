// Управление headless-браузером для обхода SafeLine WAF на av.by.
// Используем patchright (патченный Playwright), который скрывает утечку CDP Runtime.enable —
// именно её SafeLine ловит как «Debugging Detected».
//
// ВАЖНО: работает на Linux/Ubuntu (целевой сервер). Установка браузера:
//   npx patchright install chromium
// На Windows патченные форки Playwright могут не запускаться (spawn UNKNOWN) — это
// артефакт ОС, не продукта.

import { chromium } from 'patchright';
import { config } from '../config.js';

/* eslint-disable @typescript-eslint/no-explicit-any */

let contextPromise: Promise<any> | null = null;

async function createContext(): Promise<any> {
  const context = await chromium.launchPersistentContext('', {
    headless: !config.avbyHeadful,
    channel: 'chromium',
    locale: 'ru-RU',
    viewport: { width: 1366, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  return context;
}

/** Лениво создаёт и переиспользует один браузерный контекст (тёплая сессия SafeLine). */
export async function getBrowserContext(): Promise<any> {
  if (!contextPromise) {
    contextPromise = createContext().catch((e) => {
      contextPromise = null; // позволяем повторную попытку позже
      throw e;
    });
  }
  return contextPromise;
}

export async function closeBrowser(): Promise<void> {
  if (!contextPromise) return;
  try {
    const ctx = await contextPromise;
    await ctx.close();
  } catch {
    /* ignore */
  }
  contextPromise = null;
}

const CHALLENGE_MARKERS = /Confirm You Are Human|Система безопасности|Debugging Detected|\.safeline/;

/**
 * Проходит SafeLine-челлендж на текущей странице (если он есть):
 * жмёт кнопку подтверждения и ждёт появления реального контента.
 * Возвращает true, если челлендж пройден (или его не было).
 */
export async function passSafeline(page: any, timeoutMs = 25000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const html: string = await page.content().catch(() => '');
    if (!CHALLENGE_MARKERS.test(html)) return true; // челленджа нет — контент реальный

    // Пробуем нажать кнопку подтверждения SafeLine
    try {
      const btn = page.locator('#sl-check');
      if (await btn.count()) {
        await btn.click({ timeout: 3000 }).catch(() => {});
      }
    } catch {
      /* ignore */
    }
    await page.waitForTimeout(2500);
  }

  const finalHtml: string = await page.content().catch(() => '');
  return !CHALLENGE_MARKERS.test(finalHtml);
}
