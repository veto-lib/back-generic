import { z } from 'zod';

const createDocumentSchema = z.object({
  name: z.string(),
  data: z.string(),
  animal: z.string(),
  customer: z.string()
});

export type CreateDocumentType = z.infer<typeof createDocumentSchema>;

export default { createDocumentSchema };
