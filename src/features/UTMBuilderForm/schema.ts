import { z } from 'zod';

export const formSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  UTMs: z.object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
  }),
});

export type FormBuilderState = z.infer<typeof formSchema>;
export type UTMKeys = keyof FormBuilderState['UTMs'];
