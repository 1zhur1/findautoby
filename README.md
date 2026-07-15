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

## 🎨 Дизайн

- Вдохновение: Telegram Premium, Linear, Apple Wallet
- Glassmorphism, большие скругления, минимализм
- Единая дизайн-система с токенами
- Плавные анимации на Framer Motion
- Темная тема по умолчанию

## 🏗 Архитектура

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