import {
  IsString,
  IsNotEmpty,
  Matches,
  ValidateNested,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'O nome deve conter apenas letras' })
  @Matches(/^[A-Za-zÀ-ÿ\s]*$/, {
    message: 'O nome deve conter apenas letras',
  })
  name: string;

  @IsNotEmpty({ message: 'Sobrenome é obrigatório' })
  @IsString({ message: 'O sobrenome deve conter apenas letras' })
  @Matches(/^[A-Za-zÀ-ÿ\s]*$/, {
    message: 'O sobrenome deve conter apenas letras',
  })
  lastName: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsString({ message: 'CPF inválido' })
  @Matches(/^(\d{11})?$/, {
    message: 'O CPF deve conter apenas números e ter 11 caracteres',
  })
  cpf: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'O telefone deve conter apenas números' })
  @Length(10, 11, { message: 'O telefone deve ter 10 ou 11 dígitos' })
  @Matches(/^\d*$/, { message: 'O telefone deve conter apenas números' })
  phone: string;

  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @IsString({ message: 'O CEP deve ser uma string' })
  @Matches(/^(\d{8})?$/, {
    message:
      'CEP inválido, deve conter apenas números e ter exatamente 8 digitos',
  })
  zipCode: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
