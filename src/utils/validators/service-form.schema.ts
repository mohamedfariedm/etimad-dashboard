import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ServiceFormSchema = z.object({
  nameEN: z
    .string(),
  nameAR: z
    .string(),
    descriptionEN: z
    .string(),
    descriptionAR: z
    .string(),
    // titleEN: z
    // .string(),
    // titleAR: z
    // .string(),
    // brands:z.array(
    //   z.object({
    //     label: z.string(),
    //     value: z.number(),
    //   }),
    // )
});

// generate form types from zod validation schema
export type ServiceFormInput = z.infer<typeof ServiceFormSchema>;
