import { z } from 'zod';

const inputSchema = z.object({
  character1: z.number(),
  character2: z.number()
});

export type InputSchemaType = z.infer<typeof inputSchema>;

export default { inputSchema };
