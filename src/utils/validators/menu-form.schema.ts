import { z } from 'zod';

export const MenuFormSchema = z.object({
  name: z.object({
    en: z.string().min(1, { message: 'required' }),
    ar: z.string().min(1, { message: 'required' }),
  }),
  link: z.object({
    en: z.string().min(1, { message: 'required' }),
    ar: z.string().min(1, { message: 'required' }),
  }),


});

export type MenuFormInput = z.infer<typeof MenuFormSchema>;
