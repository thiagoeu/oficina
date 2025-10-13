import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 9 })
  zipCode: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user: User;

  // 🔗 Um cliente pode ter vários veículos
  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles: Vehicle[];
}
