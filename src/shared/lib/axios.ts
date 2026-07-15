import axios from 'axios';
import { config } from '@config';
import { getTelegramInitData } from './telegram';

export const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (request) => {
    // Передаём подписанный initData бэкенду для валидации пользователя.
    // Стандарт для Telegram Mini Apps: заголовок Authorization: tma <initData>.
    const initData = getTelegramInitData();
    if (initData) {
      request.headers.set('Authorization', `tma ${initData}`);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthorized
      }
      if (status === 429) {
        // Handle rate limiting
      }
    }
    return Promise.reject(error);
  },
);