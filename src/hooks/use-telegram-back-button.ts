import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backButton } from '@shared/lib/telegram';

/**
 * Показывает нативную кнопку «Назад» Telegram на всех страницах, кроме главной.
 * По нажатию возвращает на предыдущий экран.
 */
export function useTelegramBackButton(): void {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isHome = location.pathname === '/';

    if (isHome) {
      backButton.hide();
      return;
    }

    return backButton.show(() => navigate(-1));
  }, [location.pathname, navigate]);
}
