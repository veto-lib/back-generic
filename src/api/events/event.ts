import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Veterinary } from '../veterinaries/veterinary';
import { Customer } from '../customers/customer';
import { Animal } from '../animals/animal';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  @Column()
  notes: string;

  @Column()
  reason: string;

  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Animal)
  animal: Animal;

  @ManyToOne(() => Veterinary)
  veterinary: Veterinary;

  @Column()
  @Generated('uuid')
  callId: string;
}
