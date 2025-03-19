import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ServiceTrainingFormBoxSchema = z.object({
  nameEN: z
    .string().min(1, 'This field is Required'),
  nameAR: z
    .string().min(1, 'This field is Required'),
    type: z.any(),
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
export type ServiceTrainingBoxFormInput = z.infer<typeof ServiceTrainingFormBoxSchema>;
