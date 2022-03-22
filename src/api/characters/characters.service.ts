import { Not, Repository, SelectQueryBuilder } from 'typeorm';

import { ICharacter, IOpponent, PCharacter } from './character';
import { User } from '../users/user';
import { Battle } from '../battles/battle';

import { CreateCharacterType, UpdateCharacterType } from './characters.schema';

const selectFullCharacter = async (repository: Repository<PCharacter>): Promise<SelectQueryBuilder<PCharacter>> => {
  return repository
    .createQueryBuilder('c')
    .select('c.id', 'id')
    .addSelect('c.name', 'name')
    .addSelect('c.visibility', 'visibility')
    .addSelect('c.program', 'program')
    .addSelect('c.userEmail', 'userEmail')
    .addSelect(
      (qb) =>
        qb.select('COUNT(*)').from(PCharacter, 'pc')
          .innerJoin(Battle, 'b', 'pc.id = b.char1Id OR pc.id = b.char2Id')
          .where('pc.id = c.id'),
      'battlesFought'
    )
    .addSelect(
      (qb) =>
      qb.select('COUNT(*)').from(PCharacter, 'pc')
        .innerJoin(Battle, 'b', 'pc.id = b.winnerId')
        .where('pc.id = c.id'),
      'battlesWon'
    )
    .addSelect(
      (qb) =>
        qb.select('COUNT(*)').from(PCharacter, 'pc')
          .innerJoin(Battle, 'b', '(pc.id = b.char1Id OR pc.id = b.char2Id) AND pc.id != b.winnerId')
          .where('pc.id = c.id'),
      'battlesLost'
    )
    .orderBy('name');
};

const findAllPublic = async (
  repository: Repository<PCharacter>
): Promise<ICharacter[]> => {
  const query = await selectFullCharacter(repository);
  return query
    .where('c.visibility = 1')
    .getRawMany();
};

const findOpponents = async (
  repository: Repository<PCharacter>,
  email: string
): Promise<IOpponent[]> => {
  return repository.find(
    {
      select: [
        'id', 'name'
      ],
      relations: [
        'user'
      ],
      where: {
        user: {
          email: Not(email)
        }
      }
    }
  ) as unknown as IOpponent[];
};

const findAllOfUser = async (
  repository: Repository<PCharacter>,
  email: string
): Promise<ICharacter[]> => {
  const query = await selectFullCharacter(repository);
  return query
    .where('c.userEmail = :email', { email })
    .getRawMany();
};

const findOneOfUser = async (
  repository: Repository<PCharacter>,
  email: string,
  id: number
): Promise<ICharacter | undefined> => {
  const query = await selectFullCharacter(repository);
  return query
    .where('c.userEmail = :email', { email })
    .andWhere('c.id = :id', { id })
    .getRawOne();
};

const create = async (
  repository: Repository<PCharacter>,
  user: User,
  character: CreateCharacterType
): Promise<unknown> => {
  return repository.insert({ ...character, user });
};

const update = async (
  repository: Repository<PCharacter>,
  id: number,
  character: UpdateCharacterType
): Promise<unknown> => {
  return repository.update(id, { ...character });
};

const remove = async (
  repository: Repository<PCharacter>,
  id: number
): Promise<unknown> => {
  return repository.delete(id);
};

export default { findAllPublic, findOpponents, findAllOfUser, findOneOfUser, create, update, remove };
