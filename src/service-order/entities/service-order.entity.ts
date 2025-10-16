import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Mechanic } from '../../mechanic/entities/mechanic.entity';

export enum PaymentMethod {
  CARTAO = 'CARTAO',
  PIX = 'PIX',
  DINHEIRO = 'DINHEIRO',
}

@Entity('service_orders')
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  //  Cliente que solicitou a OS
  @ManyToOne(() => Customer, (customer) => customer.serviceOrders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  //  Veículo atendido
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column()
  item: string;

  @Column()
  service: string;

  @ManyToOne(() => Mechanic, (mechanic) => mechanic.serviceOrders, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mechanic_id' })
  mechanic: Mechanic;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.DINHEIRO,
  })
  payment_method: PaymentMethod;

  @Column()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
