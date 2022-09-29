import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Clinic {
  @PrimaryColumn()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  openingHours: string;

  @Column({ type: 'json' })
  compatibleAnimals: string;

  @Column({ type: 'json' })
  paymentMeans: string;
}
