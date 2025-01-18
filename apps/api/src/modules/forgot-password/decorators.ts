import {
  applyDecorators,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/core/decorators/is-public';

export const ForgotPasswordControllerDecorators = () => {
  return applyDecorators(
    Controller('forgot-password'),
    IsPublic(),
    ApiTags('Esqueci minha senha'),
  );
};

export const SendCodeEndpoint = () => {
  return applyDecorators(Post('send-code'), HttpCode(200));
};

export const ValidateCodeEndpoint = () => {
  return applyDecorators(
    Post('validate-code'),
    HttpCode(HttpStatus.NO_CONTENT),
  );
};

export const UpdatePasswordEndpoint = () => {
  return applyDecorators(Post('update-password'), HttpCode(200));
};
