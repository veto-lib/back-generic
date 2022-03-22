import { z } from 'zod';

const createCharacterSchema = z.object({
  name: z.string(),
  visibility: z.number(),
  program: z.string()
});

const updateCharacterSchema = z.object({
  name: z.string(),
  visibility: z.number(),
  program: z.string()
});

export type CreateCharacterType = z.infer<typeof createCharacterSchema>;

export type UpdateCharacterType = z.infer<typeof updateCharacterSchema>;

export default { createCharacterSchema, updateCharacterSchema };
