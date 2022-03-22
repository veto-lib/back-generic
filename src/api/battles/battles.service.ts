import { Repository } from 'typeorm';
import axios from 'axios';

import { Battle } from './battle';
import { PCharacter } from '../characters/character';
import { CONFIG } from '../../config';

const find = async (
  repository: Repository<Battle>
): Promise<Battle[]> => {
  const battles = await repository.find({
    relations: [
      'char1',
      'char2',
      'winner'
    ]
  });

  return battles.map(b => {
    b.char1 = b.char1.name as any;
    b.char2 = b.char2.name as any;
    b.winner = b.winner.name as any;
    return b;
  });
};

const create = async (
  battleRepos: Repository<Battle>,
  characterRepos: Repository<PCharacter>,
  idChar1: number,
  idChar2: number
): Promise<PCharacter> => {
  const characters = await characterRepos.findByIds([ idChar1, idChar2 ]);

  const inputData = {
    character1: {
      id: characters[0].id,
      name: characters[0].name,
      program: characters[0].program
    },
    character2: {
      id: characters[1].id,
      name: characters[1].name,
      program: characters[1].program
    }
  };

  const response = await axios.post<any>(CONFIG.sandbox.url, inputData);
  const battleResult = response.data;

  const winner = battleResult.result.winner.id === characters[0].id
    ? characters[0]
    : characters[1];

  await battleRepos.insert({
    char1: characters[0],
    char2: characters[1],
    winner,
    status: 0,
    moves: JSON.stringify(battleResult.result)
  });

  return winner;
};

export default { find, create };
