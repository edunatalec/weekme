import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/core/decorators/is-public.decorator';
import { JwtPayloadModel } from 'src/core/models/jwt.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'] as string | null;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('O token não foi fornecido.');
    }

    try {
      const token = authorization.split(' ')[1];
      const payload = this.jwtService.verify<JwtPayloadModel>(token);

      request.user = payload;

      return true;
    } catch (_) {
      throw new UnauthorizedException('O token está inválido ou expirado.');
    }
  }
}
