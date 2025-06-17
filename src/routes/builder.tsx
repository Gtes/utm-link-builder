import UTMBuilderForm from '@/features/UTMBuilderForm/UTMBuilderForm';
import z from 'zod';

export const Route = createFileRoute({
  component: UTMBuilderForm,
  validateSearch: z.object({
    url: z.string().url().optional(),
  }),
});
