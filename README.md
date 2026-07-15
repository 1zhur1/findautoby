# 🚗 FindAuto — Telegram Mini App

<p align="center">
  <strong>Современный интерфейс для поиска автомобилей в Telegram</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-purple" alt="Framer Motion 12" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4" alt="Tailwind CSS 4" />
</p>

---

## ✨ Особенности

- **🏠 Главная** — приветствие, статистика, быстрый доступ к созданию поиска
- **🔍 Мои поиски** — управление поисковыми запросами с фильтрами
- **📝 Создание поиска** — полноценный wizard с 6 секциями настройки
- **❤️ Избранное** — сохраненные автомобили
- **🔔 Уведомления** — лента новых объявлений с разделением на новые/ранее
- **👤 Профиль** — настройки, статистика, управление аккаунтом

##  Архитектура

```
src/
├── components/ui/     # Базовые UI-компоненты
├── layouts/           # Layouts (main-layout)
├── pages/             # Страницы приложения
├── widgets/           # Составные виджеты
├── mocks/             # Моковые данные
├── styles/            # Глобальные стили
├── store/             # Состояние (Zustand)
├── shared/            # Общие утилиты, константы, типы
└── routes/            # Маршрутизация
```

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview
```

## 🗄 Бэкенд

В папке [`server/`](server/) — REST API на Node + Express + TypeScript + SQLite:
авторизация по Telegram `initData`, поиски, избранное, уведомления, профиль.
Подробности — в [server/README.md](server/README.md).

Запуск фронтенда и бэкенда вместе (два терминала):

```bash
# терминал 1 — API
cd server && npm install && npm run dev      # http://localhost:8000

# терминал 2 — фронтенд
npm install && npm run dev                    # http://localhost:3000
```

Фронтенд обращается к API по адресу из `VITE_API_URL` (по умолчанию
`http://localhost:8000/api`). Если бэкенд недоступен, интерфейс автоматически
показывает моковые данные — приложение остаётся рабочим.

## 🤖 Запуск как Telegram Mini App (без ngrok)

Telegram открывает Mini App только по HTTPS, поэтому нужен публичный хостинг.
Локальный `npm run dev` подойдёт только для проверки UI в браузере (используются моковые данные).

### 1. Создать бота

1. Открыть [@BotFather](https://t.me/BotFather) → `/newbot` → получить токен.
   Токен нужен только боту/серверу, **во фронтенд его класть нельзя**.

### 2. Собрать и задеплоить фронтенд

```bash
npm install
npm run build      # результат — в папке dist/
```

Залить `dist/` на любой бесплатный статический HTTPS-хостинг:

- **Vercel** — `npm i -g vercel && vercel --prod` (или импорт репозитория на vercel.com)
- **Netlify** — перетащить папку `dist/` на app.netlify.com/drop
- **Cloudflare Pages** / **GitHub Pages** — тоже подойдут

Получите публичный URL вида `https://your-app.vercel.app`.

> Так как используется `createBrowserRouter`, включите SPA-fallback (все пути → `index.html`).
> На Vercel/Netlify это работает по умолчанию.

### 3. Привязать URL к боту

В [@BotFather](https://t.me/BotFather):

- `/newapp` — создать Mini App и указать HTTPS-URL из шага 2, **или**
- `/setmenubutton` — назначить кнопку меню, ведущую на этот URL

Открыть бота в Telegram → нажать кнопку меню → приложение запустится как Mini App
(нативная тема, кнопка «Назад», данные реального пользователя).

### 4. (Опционально) Бэкенд

Сейчас данные моковые. Для настоящего поиска нужен API (`VITE_API_URL`), который:
- принимает заголовок `Authorization: tma <initData>` (уже отправляется фронтендом),
- **валидирует `initData`** секретным ключом бота (обязательно для безопасности),
- отдаёт реальные объявления вместо `src/mocks/*`.

## 🛠 Стек технологий

- **React 19** — современный UI
- **TypeScript 6** — типизация
- **Vite 8** — сборка
- **Tailwind CSS 4** — стилизация
- **Framer Motion 12** — анимации
- **React Router 7** — навигация
- **Zustand** — управление состоянием
- **Lucide Icons** — иконки

## 📱 Поддержка

Приложение оптимизировано для работы как Telegram Mini App с поддержкой:
- Safe Area
- Адаптивный дизайн (max-width: 480px)
- Touch-friendly интерфейс