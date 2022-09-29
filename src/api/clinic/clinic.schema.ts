import { z } from 'zod';

import compatibleAnimalsSchema from '../../schemas/compatible-animals.schema';
import paymentMeansSchema from '../../schemas/payment-means.schema';

const updateClinicInformationsSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  openingHours: z.string(),
  compatibleAnimals: compatibleAnimalsSchema,
  paymentMeans: paymentMeansSchema
});

export type UpdateClinicInformationsType = z.infer<
  typeof updateClinicInformationsSchema
>;

export default { updateClinicInformationsSchema };
