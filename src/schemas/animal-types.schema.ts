import { z } from 'zod';

const animalTypesSchema = z
  .enum([ 'Chat', 'Chien', 'Oiseau', 'Lézard', 'Poisson', 'Cheval', 'Rongeur' ])
  .transform((animals) => JSON.stringify(animals));

export default animalTypesSchema;
