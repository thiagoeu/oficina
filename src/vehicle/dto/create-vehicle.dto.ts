import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'Placa é obrigatória' })
  @IsString()
  plate: string;

  @IsNotEmpty({ message: 'Marca é obrigatória' })
  @IsString()
  brand: string;

  @IsNotEmpty({ message: 'Modelo é obrigatório' })
  @IsString()
  model: string;

  @IsNotEmpty({ message: 'Cor é obrigatória' })
  @IsString()
  color: string;

  @IsNotEmpty({ message: 'Ano é obrigatório' })
  @IsNumber()
  year: number;

  @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
  @IsNumber()
  customerId: number;
}
