import { Body, Controller } from '@nestjs/common';
import { SignUpEndpoint } from 'src/modules/auth/auth.decorators';
import { UserAlreadyRegisteredException } from 'src/modules/auth/auth.exceptions';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthResponseDto } from 'src/modules/auth/dtos/auth.dto';
import { SignUpBodyDto } from 'src/modules/auth/dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SignUpEndpoint()
  public async signUp(@Body() body: SignUpBodyDto): Promise<AuthResponseDto> {
    const hasUser = await this.service.hasUserByEmail(body.email);

    if (hasUser) {
      throw new UserAlreadyRegisteredException();
    }

    return this.service.signUp(body);
  }
}
