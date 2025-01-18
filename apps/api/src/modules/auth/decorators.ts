import {
  applyDecorators,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/core/decorators/is-public';

export const AuthControllerDecorators = () => {
  return applyDecorators(
    ApiTags('Autenticação'),
    IsPublic(),
    Controller('auth'),
  );
};

export const SignUpEndpoint = () => {
  return applyDecorators(Post('sign-up'));
};

export const SignInEndpoint = () => {
  return applyDecorators(Post('sign-in'), HttpCode(HttpStatus.OK));
};
