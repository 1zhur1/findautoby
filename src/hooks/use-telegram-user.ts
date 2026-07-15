import { useMemo } from 'react';
import { getTelegramUser } from '@shared/lib/telegram';
import { profile as mockProfile, type Profile } from '@mocks/profile';

/**
 * Профиль-фолбэк: реальный пользователь Telegram, если приложение открыто в Telegram,
 * иначе моковые данные. Чистая функция — можно вызывать вне React (например, в queryFn).
 */
export function getProfileFallback(): Profile {
  const tgUser = getTelegramUser();
  if (!tgUser) return mockProfile;

  return {
    ...mockProfile,
    firstName: tgUser.first_name,
    lastName: tgUser.last_name ?? '',
    username: tgUser.username ?? '',
    telegramId: tgUser.id,
    avatarUrl: tgUser.photo_url ?? '',
    premium: tgUser.is_premium ?? mockProfile.premium,
  };
}

/** Хук над getProfileFallback для использования в компонентах. */
export function useTelegramUser(): Profile {
  return useMemo(() => getProfileFallback(), []);
}
