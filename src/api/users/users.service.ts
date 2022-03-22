import { Repository, SelectQueryBuilder } from 'typeorm';

import { IUser, User } from './user';
import { PCharacter } from '../characters/character';
import { Battle } from '../battles/battle';

import { CreateUserType } from './users.schema';

export const defaultUserValues: Partial<User> = {
  elo: 1400,
  characters: []
};

const selectFullUser = async (repository: Repository<User>): Promise<SelectQueryBuilder<User>> => {
  return repository
    .createQueryBuilder('u')
    .select('u.email', 'email')
    .addSelect('u.displayName', 'displayName')
    .addSelect('u.elo', 'elo')
    .addSelect(
      (qb) =>
        qb.select('COUNT(*) + 1').from(User, 'us').where('us.elo > u.elo'),
      'ranking'
    )
    .addSelect(
      (qb) =>
        qb.select('COUNT(*)').from(User, 'us')
          .innerJoin(PCharacter, 'c', 'c.userEmail = us.email')
          .innerJoin(Battle, 'b', 'c.id = b.char1Id OR c.id = b.char2Id')
          .where('us.email = u.email'),
      'battlesFought'
    )
    .addSelect(
      (qb) =>
        qb.select('COUNT(*)').from(User, 'us')
          .innerJoin(PCharacter, 'c', 'c.userEmail = us.email')
          .innerJoin(Battle, 'b', 'c.id = b.winnerId')
          .where('us.email = u.email'),
      'battlesWon'
    )
    .addSelect(
      (qb) =>
        qb.select('COUNT(*)').from(User, 'us')
          .innerJoin(PCharacter, 'c', 'c.userEmail = us.email')
          .innerJoin(Battle, 'b', '(c.id = b.char1Id OR c.id = b.char2Id) AND c.id != b.winnerId')
          .where('us.email = u.email'),
      'battlesLost'
    )
    .orderBy('ranking');
};

const list = async (repository: Repository<User>): Promise<IUser[]> => {
  const query = await selectFullUser(repository);
  return query.getRawMany();
};

const findOne = async (
  repository: Repository<User>,
  email: string
): Promise<IUser | undefined> => {
  const query = await selectFullUser(repository);
  return query
    .where('u.email = :email', { email })
    .getRawOne();
};

const create = async (
  repository: Repository<User>,
  user: CreateUserType
): Promise<IUser> => {
  await repository.insert({ ...user, ...defaultUserValues });
  return findOne(repository, user.email) as Promise<IUser>;
};

const updateElo = async (
  repository: Repository<User>,
  user1: User,
  user2: User,
  winner: User
): Promise<unknown> => {
  const k = 32;
  const eloDifference = Math.abs(user2.elo - user1.elo);
  const percentage = 1 / (1 + Math.pow(10, eloDifference / 400));
  const win = Math.round(k * (1 - percentage));
  const loss = Math.round(k * (0 - percentage));

  if (winner.email === user1.email) {
    user1.elo += win;
    user2.elo -= win;
  } else {
    user1.elo += loss;
    user2.elo -= loss;
  }

  return Promise.all([
    repository.update(user1.email, { elo: user1.elo }),
    repository.update(user2.email, { elo: user2.elo })
  ]);
};

export default { list, findOne, create, updateElo };
