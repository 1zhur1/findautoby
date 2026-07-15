import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { MainLayout } from '@layouts/main-layout';
import { HomePage } from '@pages/home-page';
import { SearchesPage } from '@pages/searches-page';
import { FavoritesPage } from '@pages/favorites-page';
import { NotificationsPage } from '@pages/notifications-page';
import { ProfilePage } from '@pages/profile-page';
import { CreateSearchPage } from '@pages/create-search-page';
import { SearchDetailPage } from '@pages/search-detail-page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'searches', element: <SearchesPage /> },
      { path: 'searches/:id', element: <SearchDetailPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'create-search', element: <CreateSearchPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);