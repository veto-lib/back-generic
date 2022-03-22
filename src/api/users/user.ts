import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { PCharacter } from '../characters/character';

@Entity()
export class User {

  @PrimaryColumn()
  email: string;

  @Column()
  displayName: string;

  @Column()
  elo: number;

  @OneToMany(_ => PCharacter, character => character.user)
  characters: PCharacter[];

}

export interface IUser {
  email: string;
  displayName: string;
  elo: number;
  ranking: number;
  battlesWon: number;
  battlesFought: number;
  battlesLost: number;
}
