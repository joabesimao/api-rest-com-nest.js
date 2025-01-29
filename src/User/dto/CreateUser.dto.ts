import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnic } from '../validacao/email-unico.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O email informado é invalido' })
  @EmailIsUnic({ message: 'Ja existe um usuario com esse email' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
