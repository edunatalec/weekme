import { IsEmail } from 'class-validator';

export class SendCodeBodyDto {
  @IsEmail()
  readonly email: string;
}
