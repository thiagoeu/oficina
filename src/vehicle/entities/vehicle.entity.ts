import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
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

  // Cada veículo pertence a um cliente existente
  @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    nullable: false,
    onDelete: 'CASCADE', // se o cliente for apagado, remove o veículo também
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // Um veículo pode ter MUITAS Ordens de Serviço
  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.vehicle)
  serviceOrders: ServiceOrder[]; // Array de todas as OS deste veículo
}
