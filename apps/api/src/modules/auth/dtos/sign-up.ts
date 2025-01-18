import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpBodyDto {
  @IsString()
  @MinLength(3)
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
