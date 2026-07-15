export interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  telegramId: number;
  avatarUrl: string;
  premium: boolean;
  searchesCreated: number;
  notificationsReceived: number;
  language: string;
  notificationsEnabled: boolean;
  privacyMode: boolean;
}

export const profile: Profile = {
  firstName: 'Арсений',
  lastName: 'Иванов',
  username: 'arseny',
  telegramId: 123456789,
  avatarUrl: '',
  premium: false,
  searchesCreated: 3,
  notificationsReceived: 47,
  language: 'Русский',
  notificationsEnabled: true,
  privacyMode: false,
};