import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInBodyDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
