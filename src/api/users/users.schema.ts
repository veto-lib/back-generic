import { z } from 'zod';

const createUserSchema = z.object({
  displayName: z.string(),
  email: z.string()
});

export type CreateUserType = z.infer<typeof createUserSchema>;

export default { createUserSchema };
