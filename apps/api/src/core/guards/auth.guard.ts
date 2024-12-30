import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { IS_PUBLIC_KEY } from 'src/core/decorators/is-public.decorator';
import { JwtPayload } from 'src/core/interfaces/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
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
      const { sub: id } = this.jwtService.verify<JwtPayload>(token);

      const user = await this.prisma.user.findFirst({
        where: { id, active: true },
        include: {
          roles: {
            include: {
              permissions: true,
            },
          },
        },
      });

      if (user) {
        request.user = userToEntity(user);
      } else {
        throw 'Usuário desativado ou não existente';
      }

      return true;
    } catch (_) {
      throw new UnauthorizedException('O token está inválido ou expirado.');
    }
  }
}
