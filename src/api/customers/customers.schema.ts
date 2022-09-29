import { z } from 'zod';

const createCustomerSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().transform(date => new Date(date)),
  gender: z.enum([ 'M', 'F' ]),
  phone: z.string()
});

export type CreateCustomerType = z.infer<typeof createCustomerSchema>;

export default { createCustomerSchema };
