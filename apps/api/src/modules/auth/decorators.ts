import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';

export const SignUpEndpoint = () => {
  return applyDecorators(Post('sign-up'));
};

export const SignInEndpoint = () => {
  return applyDecorators(Post('sign-in'), HttpCode(HttpStatus.OK));
};
