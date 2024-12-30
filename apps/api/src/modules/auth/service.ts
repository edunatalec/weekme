import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/prisma.service';
import { JwtPayload } from 'src/core/interfaces/jwt-payload';
import { AuthResponseDto } from 'src/modules/auth/dtos/auth.dto';
import { SignInBodyDto } from 'src/modules/auth/dtos/sign-in.dto';
import { SignUpBodyDto } from 'src/modules/auth/dtos/sign-up.dto';
import {
  hashPassword,
  validatePassword,
} from 'src/modules/auth/utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(data: SignInBodyDto): Promise<AuthResponseDto | null> {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email, active: true },
    });

    if (!user) return null;

    const isPasswordValid = await validatePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) return null;

    return this.getAccessToken(user.id);
  }

  public async signUp(data: SignUpBodyDto): Promise<AuthResponseDto> {
    const hashedPassword = await hashPassword(data.password);

    const { id: roleId } = await this.prisma.role.findFirst({
      where: { name: 'Admin' },
    });

    const { id } = await this.prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: hashedPassword,
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return this.getAccessToken(id);
  }

  public async hasUserByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({ where: { email } });

    return count > 0;
  }

  private getAccessToken(id: string): AuthResponseDto {
    const payload: JwtPayload = {
      sub: id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
