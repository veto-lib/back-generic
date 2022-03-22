import { Request } from 'express';
import { Connection } from 'typeorm';
import createHttpError from 'http-errors';

import { PCharacter } from '../characters/character';
import { Battle } from './battle';
import { User } from '../users/user';

import battlesSchema from './battles.schema';
import battlesService from './battles.service';
import usersService from '../users/users.service';

import { validateSchema } from '../../utils';

const find = async (connection: Connection): Promise<Battle[]> => {
  return battlesService.find(connection.getRepository(Battle));
};

const create = async(connection: Connection, request: Request): Promise<any> => {
  const characterIds = validateSchema(battlesSchema.inputSchema, request.body);
  const { email } = request.user as any;

  const characters = await connection.getRepository(PCharacter).findByIds([
    characterIds.character1,
    characterIds.character2
  ], {
    relations: [ 'user' ]
  });

  if (characters.length !== 2) {
    throw createHttpError(422, 'Invalid character id');
  }

  if (characters[0].user.email !== email) {
    throw createHttpError(403, 'Forbidden');
  }

  const winner = await battlesService.create(
    connection.getRepository(Battle),
    connection.getRepository(PCharacter),
    characterIds.character1,
    characterIds.character2
  );

  return usersService.updateElo(
    connection.getRepository(User),
    characters[0].user,
    characters[1].user,
    winner.id === characters[0].id ? characters[0].user : characters[1].user
  );
};

export default { find, create };
