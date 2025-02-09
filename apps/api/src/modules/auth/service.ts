import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '@repo/core';
import { PrismaService } from 'src/core/database/service';
import { JwtPayload } from 'src/core/interfaces/jwt-payload';
import { SignInBodyDto } from 'src/modules/auth/dtos/sign-in';
import { SignUpBodyDto } from 'src/modules/auth/dtos/sign-up';
import {
  hashPassword,
  validatePassword,
} from 'src/modules/auth/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(data: SignInBodyDto): Promise<TokenResponse | null> {
    const user = await this.prisma.user.findUnique({
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

  public async signUp(data: SignUpBodyDto): Promise<TokenResponse> {
    const hashedPassword = await hashPassword(data.password);

    const { id: roleId } = (await this.prisma.role.findUnique({
      where: { name: 'Admin' },
    }))!;

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

  private getAccessToken(id: string): TokenResponse {
    const payload: JwtPayload = {
      sub: id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
