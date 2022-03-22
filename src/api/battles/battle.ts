import { ManyToOne, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { PCharacter } from '../characters/character';

@Entity()
export class Battle {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(_ => PCharacter, user => user.id)
  char1: PCharacter;

  @ManyToOne(_ => PCharacter, user => user.id)
  char2: PCharacter;

  @ManyToOne(_ => PCharacter, user => user.id)
  winner: PCharacter;

  @Column()
  status: number;

  @Column('text')
  moves: string;

}
