import { IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateCustomerDto {
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @IsString({ message: 'O sobrenome deve ser uma string' })
  lastName: string;

  @IsString({ message: 'O CPF deve ser uma string' })
  cpf: string;

  @IsString({ message: 'O telefone deve conter apenas números' })
  @Matches(/^\d+$/, { message: 'O telefone deve conter apenas números' })
  phone: string; // <- mudou para string

  @IsString({ message: 'O CEP deve conter apenas números' })
  @Matches(/^\d+$/, { message: 'O CEP deve conter apenas números' })
  zipCode: string; // <- mudou para string

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
