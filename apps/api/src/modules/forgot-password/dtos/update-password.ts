import { IsPassword } from 'src/core/decorators/is-password';
import { ValidateCodeBodyDto } from 'src/modules/forgot-password/dtos/validate-code';

export class UpdatePasswordBodyDto extends ValidateCodeBodyDto {
  @IsPassword()
  readonly password: string;
}
