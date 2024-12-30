import { Body, Controller } from '@nestjs/common';
import { TokenResponse } from '@repo/core';
import { IsPublic } from 'src/core/decorators/is-public.decorator';
import { SignInEndpoint, SignUpEndpoint } from 'src/modules/auth/decorators';
import { SignInBodyDto } from 'src/modules/auth/dtos/sign-in.dto';
import { SignUpBodyDto } from 'src/modules/auth/dtos/sign-up.dto';
import {
  UserAlreadyRegisteredException,
  WrongPasswordOrEmailException,
} from 'src/modules/auth/exceptions';
import { AuthService } from 'src/modules/auth/service';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SignUpEndpoint()
  public async signUp(@Body() body: SignUpBodyDto): Promise<TokenResponse> {
    const hasUser = await this.service.hasUserByEmail(body.email);

    if (hasUser) {
      throw new UserAlreadyRegisteredException();
    }

    return this.service.signUp(body);
  }

  @SignInEndpoint()
  public async signIn(@Body() body: SignInBodyDto): Promise<TokenResponse> {
    const response = await this.service.signIn(body);

    if (!response) {
      throw new WrongPasswordOrEmailException();
    }

    return response;
  }
}
