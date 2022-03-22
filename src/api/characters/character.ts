import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/user';

@Entity()
export class PCharacter {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  visibility: number;

  @Column('text')
  program: string;

  @ManyToOne(_ => User, user => user.characters)
  user: User;

}

export interface ICharacter {
  id: number;
  name: string;
  visibility: number;
  program: string;
  userEmail: string;
  battlesWon: number;
  battlesFought: number;
  battlesLost: number;
}

export interface IOpponent {
  id: number;
  name: number;
  user: {
    email: string;
    displayName: string;
    elo: number;
  }
}
