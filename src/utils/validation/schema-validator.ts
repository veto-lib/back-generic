import createHttpError from 'http-errors';
import { z } from 'zod';

/**
 * Validates a given instance against the passed schema.
 * @param schema the schema to validate the instance.
 * @param instance the instance to validate against the schema.
 * @returns the instance if it is valid.
 * @throws a 422 Http Error if the instance is invalid.
 */
export const validateSchema = <T extends z.ZodRawShape> (schema: z.ZodObject<T>, instance: unknown) => {
  try {
    return schema.strip().parse(instance);
  } catch(error: any) {
    throw createHttpError(422, error.message);
  }
};
