import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import Layout from '@/features/Layout/Layout';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
  notFoundComponent: () => <div>404 Not Found</div>,
});
