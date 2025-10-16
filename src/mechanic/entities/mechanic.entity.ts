import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceOrder } from '../../service-order/entities/service-order.entity';

@Entity('mechanics')
export class Mechanic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Um mecânico pode ter MUITAS Ordens de Serviço
  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.mechanic)
  serviceOrders: ServiceOrder[];
}
