import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/globals.css';
import { App } from '@app/app';
import { initTelegram } from '@shared/lib/telegram';

// Инициализируем Telegram Mini App до первого рендера
initTelegram();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
