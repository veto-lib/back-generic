import { Connection } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema } from '../../utils';

import { User, IUser } from './user';
import userService from './users.service';
import userSchemas from './users.schema';

const list = async (connection: Connection): Promise<IUser[]> => {
  return userService.list(connection.getRepository(User));
};

const findOne = async (connection: Connection, request: Request): Promise<IUser> => {
  const { email } = request.params;

  const user = await userService.findOne(connection.getRepository(User), email);

  if (!user) {
    throw createHttpError(404, 'Invalid user email');
  }

  return user;
};

const create = async (connection: Connection, request: Request): Promise<IUser> => {
  const user = validateSchema(userSchemas.createUserSchema, request.body);
  return userService.create(connection.getRepository(User), user);
};

export default { list, create, findOne };
