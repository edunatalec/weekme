import { Body, Controller } from '@nestjs/common';
import { IsPublic } from 'src/core/decorators/is-public.decorator';
import {
  SignInEndpoint,
  SignUpEndpoint,
} from 'src/modules/auth/auth.decorators';
import {
  UserAlreadyRegisteredException,
  WrongPasswordOrEmailException,
} from 'src/modules/auth/auth.exceptions';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthResponseDto } from 'src/modules/auth/dtos/auth.dto';
import { SignInBodyDto } from 'src/modules/auth/dtos/sign-in.dto';
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

  @SignInEndpoint()
  @IsPublic()
  public async signIn(@Body() body: SignInBodyDto): Promise<AuthResponseDto> {
    const response = await this.service.signIn(body);

    if (!response) {
      throw new WrongPasswordOrEmailException();
    }

    return response;
  }
}
