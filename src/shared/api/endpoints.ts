import { apiClient } from '@shared/lib/axios';
import type { Car } from '@mocks/cars';
import type { Search } from '@mocks/searches';
import type { Notification } from '@mocks/notifications';
import type { Profile } from '@mocks/profile';

export type SearchInput = Partial<Omit<Search, 'id' | 'createdAt' | 'updatedAt' | 'foundCount' | 'lastCheckedAt'>>;

export interface NotificationsResponse {
  items: Notification[];
  unread: number;
}

// --- Профиль ---
export const getMe = () => apiClient.get<Profile>('/me').then((r) => r.data);
export const updateMe = (patch: Partial<Pick<Profile, 'notificationsEnabled' | 'privacyMode' | 'language'>>) =>
  apiClient.patch<Profile>('/me', patch).then((r) => r.data);

// --- Поиски ---
export const getSearches = () => apiClient.get<Search[]>('/searches').then((r) => r.data);
export const getSearch = (id: string) => apiClient.get<Search>(`/searches/${id}`).then((r) => r.data);
export const createSearch = (input: SearchInput) =>
  apiClient.post<Search>('/searches', input).then((r) => r.data);
export const updateSearch = (id: string, patch: SearchInput) =>
  apiClient.patch<Search>(`/searches/${id}`, patch).then((r) => r.data);
export const deleteSearch = (id: string) => apiClient.delete(`/searches/${id}`).then(() => undefined);

// --- Авто и избранное ---
export const getCars = () => apiClient.get<Car[]>('/cars').then((r) => r.data);
export const getFavorites = () => apiClient.get<Car[]>('/favorites').then((r) => r.data);
export const addFavorite = (carId: string) =>
  apiClient.post(`/favorites/${carId}`).then((r) => r.data);
export const removeFavorite = (carId: string) =>
  apiClient.delete(`/favorites/${carId}`).then(() => undefined);

// --- Уведомления ---
export const getNotifications = () =>
  apiClient.get<NotificationsResponse>('/notifications').then((r) => r.data);
export const markAllNotificationsRead = () =>
  apiClient.post<{ ok: boolean; unread: number }>('/notifications/read').then((r) => r.data);
export const markNotificationRead = (id: string) =>
  apiClient.post<{ ok: boolean; unread: number }>(`/notifications/${id}/read`).then((r) => r.data);
