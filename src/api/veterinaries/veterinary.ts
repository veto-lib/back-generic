import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm';

@Entity()
export class Veterinary {
  @PrimaryColumn()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'timestamptz' })
  birthDate: Date;

  @Column()
  gender: 'M' | 'F';

  @Column({ type: 'json' })
  compatibleAnimals: string;

  @Column('boolean', { default: false })
  enabled: boolean;

}
