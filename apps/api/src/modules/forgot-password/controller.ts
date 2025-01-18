import { Body } from '@nestjs/common';
import {
  ForgotPasswordControllerDecorators,
  SendCodeEndpoint,
  UpdatePasswordEndpoint,
  ValidateCodeEndpoint,
} from 'src/modules/forgot-password/decorators';
import { SendCodeBodyDto } from 'src/modules/forgot-password/dtos/send-code';
import { UpdatePasswordBodyDto } from 'src/modules/forgot-password/dtos/update-password';
import { ValidateCodeBodyDto } from 'src/modules/forgot-password/dtos/validate-code';
import { CodeExpiredOrInvalidException } from 'src/modules/forgot-password/exceptions';
import { ForgotPasswordService } from 'src/modules/forgot-password/service';

@ForgotPasswordControllerDecorators()
export class ForgotPasswordController {
  constructor(private readonly service: ForgotPasswordService) {}

  @SendCodeEndpoint()
  public async sendCode(
    @Body() body: SendCodeBodyDto,
  ): Promise<{ message: string }> {
    const user = await this.service.getUserByEmail(body.email);

    if (user) {
      if (user.forgotPassword) {
        const forgotPassword = this.service.validateCode(user.forgotPassword);

        if (!forgotPassword) {
          this.service.deleteCode(user.forgotPassword.id);
        }
      } else {
        await this.service.sendCode(user);
      }
    }

    return {
      message:
        'O código será enviado caso o e-mail exista na nossa base de dados.',
    };
  }

  @ValidateCodeEndpoint()
  public async validateCode(@Body() body: ValidateCodeBodyDto): Promise<void> {
    const user = await this.service.getUserByEmail(body.email);

    if (!user?.forgotPassword || user.forgotPassword.code !== body.code) {
      throw new CodeExpiredOrInvalidException();
    }

    const forgotPassword = await this.service.validateCode(user.forgotPassword);

    if (!forgotPassword) {
      await this.service.deleteCode(user.forgotPassword.id);

      throw new CodeExpiredOrInvalidException();
    }
  }

  @UpdatePasswordEndpoint()
  public async updatePassword(
    @Body() body: UpdatePasswordBodyDto,
  ): Promise<void> {
    await this.validateCode(body);

    await this.service.updatePassword(body.email, body.password);
  }
}
