import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Animal } from '../animals/animal';

@Entity()
export class Customer {
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

  @Column()
  phone: string;

  @OneToMany(() => Animal, (animal) => animal.customer)
  animals: Animal[];
}
