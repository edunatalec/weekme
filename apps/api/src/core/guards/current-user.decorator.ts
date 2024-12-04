import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadModel } from 'src/core/models/jwt.model';

class AuthRequest extends Request {
  readonly user: JwtPayloadModel;
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): JwtPayloadModel => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
