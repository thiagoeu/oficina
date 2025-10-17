import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/service-order.entity';

export class CreateServiceOrderDto {
  @IsNotEmpty({ message: 'Cliente deve ser informado' })
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
  service: string;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({
    message:
      'Criar OS com valor de pagamento inconsistente (Valor de pagamento inválido)',
  })
  @Type(() => Number)
  price: number;
}
