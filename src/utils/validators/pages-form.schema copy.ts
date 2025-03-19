import { z } from 'zod';

export const PageFormSchema = z.object({
  name: z.object({
    en: z.string().min(1, { message: 'required' }),
    ar: z.string().min(1, { message: 'required' }),
  }),
  title: z.object({
    en: z.string().min(1, { message: 'required' }),
    ar: z.string().min(1, { message: 'required' }),
  }),
  description: z.object({
    en: z.string().min(1, { message: 'required' }),
    ar: z.string().min(1, { message: 'required' }),
  }),
  slug: z.string().min(1, { message: 'required' })

});

export type PageFormInput = z.infer<typeof PageFormSchema>;
