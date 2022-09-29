import { z } from 'zod';

import compatibleAnimalsSchema from '../../schemas/compatible-animals.schema';

const createVeterinarySchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().transform(date => new Date(date)),
  gender: z.enum([ 'M', 'F' ]),
  compatibleAnimals: compatibleAnimalsSchema
});

export type CreateVeterinaryType = z.infer<typeof createVeterinarySchema>;

export default { createVeterinarySchema };
