import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  year: number;

  @Column({ unique: true })
  plate: string;

  // 🔗 Cada veículo pertence a um cliente existente
  @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    nullable: false,
    onDelete: 'CASCADE', // se o cliente for apagado, remove o veículo também
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
