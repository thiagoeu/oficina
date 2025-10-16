import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// database
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './db/database.config';

//modulos
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CustomerModule } from './customer/customer.module';
import { ServiceOrderModule } from './service-order/service-order.module';
import { MechanicModule } from './mechanic/mechanic.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: databaseConfig }),
    UsersModule,
    VehicleModule,
    CustomerModule,
    ServiceOrderModule,
    MechanicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
