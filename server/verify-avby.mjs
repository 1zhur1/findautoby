// Диагностика доступа к av.by через headless-браузер (запускать НА СЕРВЕРЕ).
//   npx patchright install --with-deps chromium
//   node verify-avby.mjs
// Через прокси (если IP сервера блокируется):
//   AVBY_PROXY="http://user:pass@host:port" node verify-avby.mjs
//   (или socks5://host:port)

import { chromium } from 'patchright';

const markers = /Confirm You Are Human|Система безопасности|Debugging Detected|\.safeline/;
const proxy = process.env.AVBY_PROXY
  ? { server: process.env.AVBY_PROXY }
  : undefined;

const captured = [];
const context = await chromium.launchPersistentContext('', {
  headless: process.env.AVBY_HEADFUL !== 'true',
  channel: 'chromium',
  locale: 'ru-RU',
  timezoneId: 'Europe/Minsk',
  viewport: { width: 1366, height: 900 },
  proxy,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
const page = await context.newPage();

page.on('response', async (resp) => {
  const url = resp.url();
  if (!/api\.av\.by/i.test(url)) return;
  try {
    const ct = resp.headers()['content-type'] || '';
    if (ct.includes('json')) captured.push({ url, status: resp.status(), json: await resp.json() });
  } catch {}
});

async function visit(label, url) {
  console.log(`\n--- ${label}: ${url} ${proxy ? '(via proxy)' : ''}`);
  let status = 0;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    status = resp ? resp.status() : 0;
  } catch (e) {
    console.log('  goto error:', e.message);
  }
  // Проходим SafeLine, если он есть
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const html = await page.content().catch(() => '');
    if (!markers.test(html)) break;
    const btn = page.locator('#sl-check');
    if (await btn.count()) await btn.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2500);
  }
  await page.waitForTimeout(2000);
  const title = await page.title().catch(() => '');
  const text = (await page.evaluate(() => document.body?.innerText || '').catch(() => '')).replace(/\s+/g, ' ').slice(0, 160);
  console.log(`  nav status: ${status} | title: ${title}`);
  console.log(`  text: ${text}`);
}

// 1) Прогрев с главной, затем страница фильтра
await visit('homepage', 'https://cars.av.by/');
await visit('filter', 'https://cars.av.by/filter');

const cookies = await context.cookies();
console.log('\ncookies:', cookies.map((c) => c.name).join(', ') || '(нет)');
console.log('captured api.av.by JSON responses:', captured.length);
for (const c of captured.slice(0, 3)) {
  const arr = c.json?.offers ?? c.json?.adverts ?? (Array.isArray(c.json) ? c.json : c.json?.items) ?? [];
  console.log(`- ${c.status} ${c.url.slice(0, 70)} | keys: ${JSON.stringify(Object.keys(c.json || {})).slice(0, 100)} | offers: ${arr.length}`);
  if (arr.length) {
    console.log('  offer[0] keys:', JSON.stringify(Object.keys(arr[0])));
    console.log('  offer[0] sample:', JSON.stringify(arr[0]).slice(0, 700));
  }
}

await context.close();
