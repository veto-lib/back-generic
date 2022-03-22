import { Connection } from 'typeorm';
import { Request } from 'express';
import createHttpError from 'http-errors';

import { validateSchema, validateUser } from '../../utils';

import { ICharacter, IOpponent, PCharacter } from './character';
import { User } from '../users/user';

import charactersService from './characters.service';
import charactersSchema from './characters.schema';

const findAllPublic = async (connection: Connection): Promise<ICharacter[]> => {
  return charactersService.findAllPublic(connection.getRepository(PCharacter));
};

const findAllOfUser = async (connection: Connection, request: Request): Promise<ICharacter[]> => {
  const { email } = request.params;

  if (!validateUser(email, request)) {
    throw createHttpError(403, 'Forbidden');
  }

  return charactersService.findAllOfUser(connection.getRepository(PCharacter), email);
};

const findOpponents = async (connection: Connection, request: Request): Promise<IOpponent[]> => {
  const { email } = request.params;

  if (!validateUser(email, request)) {
    throw createHttpError(403, 'Forbidden');
  }

  return charactersService.findOpponents(connection.getRepository(PCharacter), email);
};

const findOneOfUser = async (connection: Connection, request: Request): Promise<ICharacter> => {
  const { email, id } = request.params;

  if (!validateUser(email, request)) {
    throw createHttpError(403, 'Forbidden');
  }

  const character = await charactersService.findOneOfUser(
    connection.getRepository(PCharacter),
    email,
    +id
  );

  if (!character) {
    throw createHttpError(404, 'Invalid character id');
  }

  return character;
};

const create = async (connection: Connection, request: Request): Promise<unknown> => {
  const character = validateSchema(charactersSchema.createCharacterSchema, request.body);
  const { email } = request.params;

  const user = await connection.getRepository(User).findOne(email);

  if (!user) {
    throw createHttpError(404, 'Invalid user email');
  }

  return charactersService.create(connection.getRepository(PCharacter), user, character);
};

const update = async (connection: Connection, request: Request): Promise<unknown> => {
  const character = validateSchema(charactersSchema.updateCharacterSchema, request.body);

  const { email, id } = request.params;

  if (!validateUser(email, request)) {
    throw createHttpError(403, 'Forbidden');
  }

  const dbCharacter = await charactersService.findOneOfUser(
    connection.getRepository(PCharacter),
    email,
    +id
  );

  if (!dbCharacter) {
    throw createHttpError(404, 'Invalid character id');
  }

  return charactersService.update(connection.getRepository(PCharacter), +id, character);
};

const remove = async (connection: Connection, request: Request): Promise<unknown> => {
  const { email, id } = request.params;

  if (!validateUser(email, request)) {
    throw createHttpError(403, 'Forbidden');
  }

  const dbCharacter = await charactersService.findOneOfUser(
    connection.getRepository(PCharacter),
    email,
    +id
  );

  if (!dbCharacter) {
    throw createHttpError(404, 'Invalid character id');
  }

  return charactersService.remove(connection.getRepository(PCharacter), +id);
};

export default { findAllPublic, findOpponents, findAllOfUser, findOneOfUser, create, update, remove };
