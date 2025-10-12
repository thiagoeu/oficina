import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 }) // Aumentei pra 50, nomes podem ser longos
  name: string;

  @Column({ length: 50 }) // Aumentei pra 50, sobrenomes podem ser longos
  lastName: string;

  @Column({ length: 11, unique: true }) // CPF tem 11 caracteres
  cpf: string;

  @Column({ length: 15 }) // Telefone com DDD e país
  phone: string;

  @Column({ length: 9 }) // CEP tem 8 caracteres, mas com hífen fica 9
  zipCode: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user: User;
}
