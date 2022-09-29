import { Request } from 'express';

export interface User {
  email: string;
}

export const getUser = (request: Request): User => {
  return request.user as User;
};
