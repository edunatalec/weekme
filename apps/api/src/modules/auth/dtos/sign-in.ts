import { IsEmail } from 'class-validator';
import { IsPassword } from 'src/core/decorators/is-password';

export class SignInBodyDto {
  @IsEmail()
  readonly email: string;

  @IsPassword()
  readonly password: string;
}
