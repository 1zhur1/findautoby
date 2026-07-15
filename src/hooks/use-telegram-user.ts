import { useMemo } from 'react';
import { getTelegramUser } from '@shared/lib/telegram';
import { profile as mockProfile, type Profile } from '@mocks/profile';

/**
 * Данные профиля пользователя.
 * Внутри Telegram берём реального пользователя, вне Telegram — моковые данные для разработки.
 */
export function useTelegramUser(): Profile {
  return useMemo(() => {
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
  }, []);
}
