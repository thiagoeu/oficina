import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [UsersModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
