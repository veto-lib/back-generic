import { z } from 'zod';

import animalTypesSchema from '../../../schemas/animal-types.schema';

const createAnimalSchema = z.object({
  name: z.string(),
  type: animalTypesSchema,
  birthDate: z.string().transform(date => new Date(date)),
  gender: z.enum([ 'M', 'F' ]),
  owner: z.string()
});

export type CreateAnimalType = z.infer<typeof createAnimalSchema>;

export default { createAnimalSchema };
