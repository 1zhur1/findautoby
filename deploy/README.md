# Деплой FindAuto на auto.minelife.club (Ubuntu 22.04)

Схема: **nginx** (443) → фронтенд `127.0.0.1:3013` и API `127.0.0.1:4245`.

## 1. DNS

Создайте A-запись: `auto.minelife.club` → IP вашего сервера. Дождитесь применения:

```bash
dig +short auto.minelife.club
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

## 4. nginx + SSL

```bash
sudo mkdir -p /var/www/certbot

# Скопировать конфиг
sudo cp deploy/nginx/auto.minelife.club.conf /etc/nginx/sites-available/auto.minelife.club.conf
sudo ln -s /etc/nginx/sites-available/auto.minelife.club.conf /etc/nginx/sites-enabled/

# ВАЖНО: сертификатов ещё нет — временно закомментируйте весь блок `server { listen 443 ... }`
# в конфиге, оставив только блок :80. Затем:
sudo nginx -t && sudo systemctl reload nginx
```

Получить сертификат (**команда certbot**):

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  -d auto.minelife.club \
  --agree-tos -m admin@minelife.club --no-eff-email
```

> Альтернатива в одну команду (certbot сам правит конфиг):
> `sudo certbot --nginx -d auto.minelife.club`

После выпуска — раскомментируйте блок `:443` и перезагрузите nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Автопродление уже настроено таймером systemd. Проверка:

```bash
sudo certbot renew --dry-run
```

## 5. Проверка

```bash
curl -I https://auto.minelife.club
curl https://auto.minelife.club/api/health     # {"status":"ok",...}
```

Затем в @BotFather укажите Mini App URL: `https://auto.minelife.club`.

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
