import { z } from 'zod';

const paymentMeansSchema = z
  .array(z.enum([ 'CB', 'Chèques', 'Liquide' ]))
  .transform((means) => JSON.stringify(means));

export default paymentMeansSchema;
