import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { AuthRequest } from 'src/core/guards/auth/guard';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
