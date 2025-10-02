import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('service_orders')
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  // Relação obrigatória com Vehicle
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders, {
    nullable: false,
  })
  @JoinColumn()
  vehicle: Vehicle;

  // Relação obrigatória com Customer
  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn()
  customer: Customer;
}
