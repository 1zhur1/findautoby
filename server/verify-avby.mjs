// Проверка обхода SafeLine и разведка формата данных av.by.
// Запускать НА СЕРВЕРЕ (Ubuntu), где patchright проходит челлендж:
//   npx patchright install chromium
//   node verify-avby.mjs
//
// Скрипт грузит cars.av.by, проходит SafeLine, перехватывает ответы api.av.by
// и печатает ключи первого оффера — по ним финализируется маппер в src/parsers/sources/avby.ts

import { chromium } from 'patchright';

const captured = [];
const context = await chromium.launchPersistentContext('', {
  headless: process.env.AVBY_HEADFUL !== 'true',
  channel: 'chromium',
  locale: 'ru-RU',
  viewport: { width: 1366, height: 900 },
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const page = await context.newPage();

page.on('response', async (resp) => {
  const url = resp.url();
  if (!/api\.av\.by/i.test(url)) return;
  try {
    const ct = resp.headers()['content-type'] || '';
    if (!ct.includes('json')) return;
    const json = await resp.json();
    captured.push({ url, json });
    console.log('[xhr]', resp.status(), url.slice(0, 90));
  } catch {}
});

console.log('goto cars.av.by/filter ...');
await page.goto('https://cars.av.by/filter', { waitUntil: 'domcontentloaded', timeout: 40000 }).catch((e) => console.log('goto err', e.message));

// Проходим SafeLine
const markers = /Confirm You Are Human|Система безопасности|Debugging Detected|\.safeline/;
const deadline = Date.now() + 25000;
while (Date.now() < deadline) {
  const html = await page.content().catch(() => '');
  if (!markers.test(html)) break;
  const btn = page.locator('#sl-check');
  if (await btn.count()) await btn.click({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(2500);
}
await page.waitForTimeout(5000);

const title = await page.title().catch(() => '');
const html = await page.content().catch(() => '');
console.log('\n=== РЕЗУЛЬТАТ ===');
console.log('title:', title);
console.log('SafeLine passed:', !markers.test(html));
console.log('captured api.av.by responses:', captured.length);

for (const c of captured) {
  const arr = c.json?.offers ?? c.json?.adverts ?? (Array.isArray(c.json) ? c.json : c.json?.items) ?? [];
  console.log(`- ${c.url.slice(0, 70)} | top keys: ${JSON.stringify(Object.keys(c.json || {})).slice(0, 120)} | offers: ${arr.length}`);
  if (arr.length) {
    console.log('  offer[0] keys:', JSON.stringify(Object.keys(arr[0])));
    console.log('  offer[0] sample:', JSON.stringify(arr[0]).slice(0, 800));
    break;
  }
}

await context.close();
