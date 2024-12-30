import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@repo/core';

class AuthRequest extends Request {
  readonly user: UserEntity;
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
