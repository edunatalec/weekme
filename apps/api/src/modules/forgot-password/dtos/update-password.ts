import { IsString, MaxLength, MinLength } from 'class-validator';
import { ValidateCodeBodyDto } from 'src/modules/forgot-password/dtos/validate-code';

export class UpdatePasswordBodyDto extends ValidateCodeBodyDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
