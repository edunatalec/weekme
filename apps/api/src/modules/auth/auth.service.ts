import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserRepository } from 'src/core/database/repositories/user.repository';
import { JwtPayloadModel } from 'src/core/models/jwt.model';
import {
  hashPassword,
  validatePassword,
} from 'src/modules/auth/utils/password.utils';
import { AuthResponseDto } from 'src/modules/auth/dtos/auth.dto';
import { SignUpBodyDto } from 'src/modules/auth/dtos/sign-up.dto';
import { SignInBodyDto } from 'src/modules/auth/dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(data: SignInBodyDto): Promise<AuthResponseDto | null> {
    const user: User = await this.userRepository.user.findFirst({
      where: { email: data.email, active: true },
    });

    if (!user) return null;

    const isPasswordValid = await validatePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) return null;

    return this.getAccessToken(user);
  }

  public async signUp(data: SignUpBodyDto): Promise<AuthResponseDto> {
    const hashedPassword = await hashPassword(data.password);

    const user: User = await this.userRepository.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        password: hashedPassword,
      },
    });

    return this.getAccessToken(user);
  }

  public async hasUserByEmail(email: string): Promise<boolean> {
    const count = await this.userRepository.user.count({ where: { email } });

    return count > 0;
  }

  private getAccessToken(user: User): AuthResponseDto {
    const payload: JwtPayloadModel = {
      sub: user.id,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
