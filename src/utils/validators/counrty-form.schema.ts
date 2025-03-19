import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const CounrtyFormSchema = z.object({
  nameEN: z
    .string(),
  nameAR: z
    .string(),
    descriptionEN: z
    .string().min(1,"is Required"),
    descriptionAR: z
    .string().min(1,"is Required"),
    phone: z
    .string().min(1,"is Required"),
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
export type  CounrtyFormInput = z.infer<typeof  CounrtyFormSchema>;
