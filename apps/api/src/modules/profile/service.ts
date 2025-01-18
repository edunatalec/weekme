import { Injectable } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/service';
import { UpdateProfileBodyDto } from 'src/modules/profile/dtos/update';

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
}
