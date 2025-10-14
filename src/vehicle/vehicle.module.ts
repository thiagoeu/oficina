import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Customer])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
