import { z } from 'zod';

const compatibleAnimalsSchema = z
  .array(
    z.enum([
      'Chat',
      'Chien',
      'Oiseau',
      'Lézard',
      'Poisson',
      'Cheval',
      'Rongeur'
    ])
  )
  .transform((animals) => JSON.stringify(animals));

export default compatibleAnimalsSchema;
