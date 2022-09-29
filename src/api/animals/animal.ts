import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Customer } from '../customers/customer';

@Entity()
export class Animal {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'timestamptz' })
  birthDate: Date;

  @Column()
  gender: 'M' | 'F';

  @ManyToOne(() => Customer, (customer) => customer.animals)
  customer: Customer;
}
