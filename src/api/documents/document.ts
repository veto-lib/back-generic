import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Animal } from '../animals/animal';
import { Customer } from '../customers/customer';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  uploaded: Date;

  @Column()
  data: string;

  @ManyToOne(() => Animal)
  animal: Animal;

  @ManyToOne(() => Customer)
  customer: Customer;
}
