import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@repo/core';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { IS_PUBLIC_KEY } from 'src/core/decorators/is-public.decorator';
import { JwtPayload } from 'src/core/interfaces/jwt-payload';
import { getMetadata } from 'src/core/utils/metadata';

export class AuthRequest extends Request {
  user: UserEntity;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = getMetadata<boolean>({
      key: IS_PUBLIC_KEY,
      reflector: this.reflector,
      context,
    });

    const request: AuthRequest = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'] as string | null;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      if (isPublic) return true;

      throw new UnauthorizedException('O token não foi fornecido.');
    }

    try {
      const token = authorization.split(' ')[1];
      const { sub: id } = this.jwtService.verify<JwtPayload>(token);

      const user = await this.prisma.user.findUnique({
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
      if (isPublic) return true;

      throw new UnauthorizedException('O token está inválido ou expirado.');
    }
  }
}
