import { IsEmail, IsString, MinLength } from 'class-validator';
import { IsPassword } from 'src/core/decorators/is-password';

export class SignUpBodyDto {
  @IsString()
  @MinLength(3)
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  @IsPassword()
  readonly password: string;
}
