import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@providers';
import { ThemeProvider } from '@providers';
import { router } from '@routes';

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
}