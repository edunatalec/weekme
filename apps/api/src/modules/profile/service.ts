import { Injectable } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/service';
import {
  hashPassword,
  validatePassword,
} from 'src/modules/auth/utils/password';
import { UpdateProfileBodyDto } from 'src/modules/profile/dtos/update';
import { UpdateProfilePasswordBodyDto } from 'src/modules/profile/dtos/update-password';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  public async update(
    id: string,
    body: UpdateProfileBodyDto,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: body,
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return userToEntity(user);
  }

  public async updatePassword(
    id: string,
    body: UpdateProfilePasswordBodyDto,
  ): Promise<void> {
    const hashedPassword = await hashPassword(body.newPassword);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  public async validatePassword(
    id: string,
    body: UpdateProfilePasswordBodyDto,
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return validatePassword(body.currentPassword, user!.password);
  }
}
