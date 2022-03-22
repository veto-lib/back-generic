import { Request } from 'express';
import createHttpError from 'http-errors';
import { Connection } from 'typeorm';

import { validateUser } from '../../utils';

import { PCharacter } from '../characters/character';

import charactersService from '../characters/characters.service';
import qualityService from './quality.service';

const analyse = async (connection: Connection, request: Request) => {
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

  const program = Buffer.from(dbCharacter.program, 'base64').toString();

  return qualityService.analyse(program);
};

export default { analyse };
