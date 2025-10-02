import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  authenticated: boolean;
}
