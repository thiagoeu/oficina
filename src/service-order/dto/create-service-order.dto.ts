import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/service-order.entity';

export class CreateServiceOrderDto {
  @IsInt()
  @Type(() => Number)
  customer_id: number;

  @IsInt()
  @Type(() => Number)
  vehicle_id: number;

  @IsInt()
  @Type(() => Number)
  mechanic_id: number;

  @IsString()
  @IsNotEmpty()
  item: string;

  @IsString()
  @IsNotEmpty()
  service: string;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number;
}
