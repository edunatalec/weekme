import { IsString, MinLength } from 'class-validator';

export class UpdateProfileBodyDto {
  @IsString()
  @MinLength(3)
  readonly fullName: string;
}
