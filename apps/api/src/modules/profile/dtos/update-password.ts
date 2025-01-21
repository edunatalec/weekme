import { IsPassword } from 'src/core/decorators/is-password';

export class UpdateProfilePasswordBodyDto {
  @IsPassword()
  readonly currentPassword: string;

  @IsPassword()
  readonly newPassword: string;
}
