# Деплой FindAuto на auto.minestill.fun (Ubuntu 22.04)

Схема: **nginx** (443) → фронтенд `127.0.0.1:3013` и API `127.0.0.1:4245`.

## 1. DNS

Создайте A-запись: `auto.minestill.fun` → IP вашего сервера. Дождитесь применения:

```bash
dig +short auto.minestill.fun
```

## 2. Пакеты

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
# Node 20+ (если ещё нет)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2
```

## 3. Код и сборка

```bash
# репозиторий, например в /var/www/findautoby
cd /var/www/findautoby

# Бэкенд
cd server
npm ci
cp .env.example .env        # заполните TELEGRAM_BOT_TOKEN, при нужде AVBY_ENABLED
npm run build
pm2 start dist/index.js --name findauto-api      # слушает 127.0.0.1:4245

# (опционально) av.by через headless-браузер:
# npx patchright install --with-deps chromium && node verify-avby.mjs

# Фронтенд
cd ..
npm ci
npm run build               # использует .env.production (VITE_API_URL=/api)
pm2 start npm --name findauto-web -- run preview  # vite preview на 3013

pm2 save
pm2 startup                 # автозапуск pm2 после ребута (выполните выведенную команду)
```

## 4. nginx + SSL (домен за Cloudflare)

`auto.minestill.fun` проксируется через Cloudflare (оранжевое облако — DNS указывает
на IP Cloudflare `2606:4700…`). Самый надёжный путь — **Cloudflare Origin Certificate**
(без certbot, сертификат на 15 лет).

**4.1. Выпустить Origin-сертификат**
Cloudflare Dashboard → домен → **SSL/TLS → Origin Server → Create Certificate**
→ RSA, hostnames `auto.minestill.fun` (можно `*.minestill.fun`) → Create.
Скопируйте **Origin Certificate** и **Private Key**.

**4.2. Положить на сервер**
```bash
sudo mkdir -p /etc/nginx/ssl
sudo nano /etc/nginx/ssl/minestill-origin.pem   # вставить Origin Certificate
sudo nano /etc/nginx/ssl/minestill-origin.key   # вставить Private Key
sudo chmod 600 /etc/nginx/ssl/minestill-origin.key
```

**4.3. Включить конфиг**
```bash
sudo cp deploy/nginx/auto.minestill.fun.conf /etc/nginx/sites-available/auto.minestill.fun.conf
sudo ln -s /etc/nginx/sites-available/auto.minestill.fun.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/auto.minelife.club.conf   # убрать старый, если был
sudo nginx -t && sudo systemctl reload nginx
```

**4.4. Режим SSL в Cloudflare**
**SSL/TLS → Overview → Full (strict)** (обязательно). Опционально **Always Use HTTPS → On**.

Готово — certbot не нужен, сертификат не истекает 15 лет.

---

**Альтернатива — Let's Encrypt напрямую (без Cloudflare-прокси).**
Переведите DNS-запись в Cloudflare в **DNS only** (серое облако), чтобы домен указывал
прямо на IP сервера, затем:
```bash
sudo mkdir -p /var/www/certbot
# в конфиге временно оставьте только блок :80 (закомментируйте :443), reload nginx
sudo certbot certonly --webroot -w /var/www/certbot -d auto.minestill.fun \
  --agree-tos -m admin@minestill.fun --no-eff-email
# затем пропишите пути /etc/letsencrypt/live/auto.minestill.fun/{fullchain,privkey}.pem
```

> **Почему certbot выдал 404:** Let's Encrypt стучался на IP Cloudflare, а nginx на origin
> был настроен на старый домен `auto.minelife.club` и не отдавал challenge для
> `auto.minestill.fun`. С Origin-сертификатом этот шаг не нужен вовсе.

## 5. Проверка

```bash
curl -I https://auto.minestill.fun
curl https://auto.minestill.fun/api/health     # {"status":"ok",...}
```

Затем в @BotFather укажите Mini App URL: `https://auto.minestill.fun`.

## Порты

| Сервис | Порт | Наружу |
| --- | --- | --- |
| Фронтенд (vite preview) | 3013 | нет (только nginx) |
| Бэкенд API | 4245 | нет (только nginx, путь /api) |
| nginx | 80/443 | да |

Порты 3013/4245 слушаются на 127.0.0.1 — снаружи закрыты, доступ только через nginx.

## Полезное

```bash
pm2 logs findauto-api        # логи API (в т.ч. отправка Telegram, парсинг)
pm2 logs findauto-web
pm2 restart findauto-api     # после изменений
sudo tail -f /var/log/nginx/error.log
```
