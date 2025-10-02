import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { ServiceOrder } from '../../service-order/entities/service-order.entity';

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

  // Relação obrigatória com Customer
  @ManyToOne(() => Customer, (customer) => customer.vehicle, {
    nullable: false,
  })
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => ServiceOrder, (order) => order.vehicle)
  serviceOrders: ServiceOrder[];
}
