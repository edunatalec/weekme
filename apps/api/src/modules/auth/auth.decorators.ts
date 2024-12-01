import { applyDecorators, Post } from '@nestjs/common';

export const SignUpEndpoint = () => {
  return applyDecorators(Post('sign-up'));
};
