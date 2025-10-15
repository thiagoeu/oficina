import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsDefined({ message: 'Placa é obrigatória' })
  @IsNotEmpty({ message: 'Placa é obrigatória' })
  @IsString()
  plate: string;

  @IsDefined({ message: 'Marca é obrigatória' })
  @IsNotEmpty({ message: 'Marca é obrigatória' })
  @IsString()
  brand: string;

  @IsDefined({ message: 'Modelo é obrigatório' })
  @IsNotEmpty({ message: 'Modelo é obrigatório' })
  @IsString()
  model: string;

  @IsDefined({ message: 'Cor é obrigatória' })
  @IsNotEmpty({ message: 'Cor é obrigatória' })
  @IsString()
  color: string;

  @IsDefined({ message: 'Ano é obrigatório' })
  @IsNumber({}, { message: 'Ano é obrigatório' })
  year: number;

  @IsDefined({ message: 'Cliente deve ser selecionado' })
  @IsNumber()
  customerId: number;
}
