import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @MinLength(5, { message: 'A senha deve ter pelo menos 5 caracteres' })
  password: string;
}
