import { z } from 'zod';

const createEventSchema = z.object({
  title: z.string(),
  start: z.string().transform((date) => new Date(date)),
  end: z.string().transform((date) => new Date(date)),
  notes: z.string(),
  reason: z.enum([
    'Vaccination',
    'Consultation',
    'Identification',
    'Visite de contrôle'
  ]),
  animal: z.string(),
  customer: z.string(),
  veterinary: z.string()
});

const updateNotesSchema = z.object({
  notes: z.string()
});

export type UpdateNotesType = z.infer<typeof updateNotesSchema>;
export type CreateEventType = z.infer<typeof createEventSchema>;

export default { updateNotesSchema, createEventSchema };
