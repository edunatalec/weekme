import { Body } from '@nestjs/common';
import { TokenResponse } from '@repo/core';
import {
  AuthControllerDecorators,
  SignInEndpoint,
  SignUpEndpoint,
} from 'src/modules/auth/decorators';
import { SignInBodyDto } from 'src/modules/auth/dtos/sign-in';
import { SignUpBodyDto } from 'src/modules/auth/dtos/sign-up';
import {
  UserAlreadyRegisteredException,
  WrongPasswordOrEmailException,
} from 'src/modules/auth/exceptions';
import { AuthService } from 'src/modules/auth/service';

@AuthControllerDecorators()
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

    if (response) return response;

    throw new WrongPasswordOrEmailException();
  }
}
