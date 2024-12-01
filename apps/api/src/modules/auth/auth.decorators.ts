import { applyDecorators, HttpCode, HttpStatus, Post } from '@nestjs/common';

export const SignUpEndpoint = () => {
  return applyDecorators(Post('sign-up'), HttpCode(HttpStatus.OK));
};
