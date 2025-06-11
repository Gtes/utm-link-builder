import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute({
  loader: () => {
    throw redirect({ to: '/builder' });
  },
  notFoundComponent: () => <div>404 Not Found</div>,
});
