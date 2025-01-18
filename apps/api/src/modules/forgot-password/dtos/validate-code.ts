import { IsString } from 'class-validator';
import { SendCodeBodyDto } from 'src/modules/forgot-password/dtos/send-code';

export class ValidateCodeBodyDto extends SendCodeBodyDto {
  @IsString()
  readonly code: string;
}
