import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  //@IsDefined({ message: 'Ano é obrigatório' }) // Garante que o campo foi enviado
  @IsNumber({}, { message: 'Ano é obrigatório' }) // Garante que o valor é um número
  year: number;

  @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
  @IsNumber()
  customerId: number;
}
