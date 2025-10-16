import { Module } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderController } from './service-order.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrder } from './entities/service-order.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Mechanic } from '../mechanic/entities/mechanic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceOrder, Customer, Vehicle, Mechanic]),
  ],
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService],
})
export class ServiceOrderModule {}
