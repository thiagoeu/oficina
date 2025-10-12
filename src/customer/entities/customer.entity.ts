import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Entity('customers')
export class Customer {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @PrimaryColumn()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  zipCode: string;

  // @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders)
  // @JoinColumn()
  // vehicle: Vehicle;

  // Relacionamento 1:1 com User
  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user: User;
}
