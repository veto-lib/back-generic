import { Request } from 'express';

export const validateUser = (email: string, request: Request): boolean => {
  return email === (request.user as any).email;
};
