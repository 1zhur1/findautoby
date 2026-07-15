import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@shared/api/endpoints';
import type { SearchInput } from '@shared/api/endpoints';
import { getProfileFallback } from './use-telegram-user';
import { searches as mockSearches } from '@mocks/searches';
import { notifications as mockNotifications } from '@mocks/notifications';
import { cars as mockCars } from '@mocks/cars';

/**
 * Оборачивает запрос: если бэкенд недоступен (например, локально без сервера),
 * возвращаем моковые данные, чтобы приложение всё равно отрисовалось.
 */
async function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[api] запрос не удался, использую моковые данные:', error);
    }
    return fallback;
  }
}

export const queryKeys = {
  me: ['me'] as const,
  searches: ['searches'] as const,
  search: (id: string) => ['searches', id] as const,
  searchResults: (id: string) => ['searches', id, 'results'] as const,
  favorites: ['favorites'] as const,
  notifications: ['notifications'] as const,
};

// --- Профиль ---
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => withFallback(api.getMe(), getProfileFallback()),
  });
}

// --- Поиски ---
export function useSearches() {
  return useQuery({
    queryKey: queryKeys.searches,
    queryFn: () => withFallback(api.getSearches(), mockSearches),
  });
}

export function useSearch(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.search(id ?? ''),
    enabled: !!id,
    queryFn: () =>
      withFallback(api.getSearch(id!), mockSearches.find((s) => s.id === id) ?? null),
  });
}

export function useCreateSearch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SearchInput) => api.createSearch(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.searches }),
  });
}

export function useUpdateSearch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: SearchInput }) => api.updateSearch(id, patch),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.searches });
      qc.invalidateQueries({ queryKey: queryKeys.search(id) });
    },
  });
}

export function useDeleteSearch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteSearch(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.searches }),
  });
}

// --- Парсинг результатов ---
export function useSearchResults(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.searchResults(id ?? ''),
    enabled: !!id,
    queryFn: () => withFallback(api.getSearchResults(id!), [] as Awaited<ReturnType<typeof api.getSearchResults>>),
    // Пока результатов нет (например, идёт фоновый парсинг после создания),
    // опрашиваем каждые 4с; как только появились — прекращаем.
    refetchInterval: (query) => (query.state.data && query.state.data.length > 0 ? false : 4000),
  });
}

export function useRunSearch() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.runSearchNow(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: queryKeys.searchResults(id) });
      qc.invalidateQueries({ queryKey: queryKeys.searches });
      qc.invalidateQueries({ queryKey: queryKeys.notifications });
    },
  });
}

// --- Избранное ---
export function useFavorites() {
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: () => withFallback(api.getFavorites(), mockCars),
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ carId, isFavorite }: { carId: string; isFavorite: boolean }) =>
      isFavorite ? api.removeFavorite(carId) : api.addFavorite(carId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.favorites });
    },
  });
}

// --- Уведомления ---
export function useNotifications() {
  const newCount = mockNotifications.filter((n) => n.isNew).length;
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () =>
      withFallback(api.getNotifications(), { items: mockNotifications, unread: newCount }),
  });
}

export function useMarkNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.markAllNotificationsRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.notifications }),
  });
}
