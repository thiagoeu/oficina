import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha não preenchida', always: true }) // <-- dispara primeiro
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
