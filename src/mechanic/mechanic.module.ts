import { Module } from '@nestjs/common';
import { MechanicService } from './mechanic.service';
import { MechanicController } from './mechanic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanic } from './entities/mechanic.entity';
import { ServiceOrder } from '../service-order/entities/service-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanic, ServiceOrder])],
  controllers: [MechanicController],
  providers: [MechanicService],
})
export class MechanicModule {}
