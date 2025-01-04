import { Injectable } from '@nestjs/common';
import { Pageable, UserEntity } from '@repo/core';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationService } from 'src/core/services/pagination.service';
import { SearchUsersQueryDto } from 'src/modules/users/dtos/search.dto';
import { UpdateUserBodyDto } from 'src/modules/users/dtos/update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) {}

  public async search(
    query: SearchUsersQueryDto,
  ): Promise<Pageable<UserEntity> | null> {
    return this.pagination.search<'user'>({
      module: 'user',
      mapper: userToEntity,
      page: query.page,
      size: query.size,
      orderBy: {
        fullName: 'asc',
      },
      where: { fullName: { contains: query.name, mode: 'insensitive' } },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  public async getById(id: string): Promise<UserEntity | null> {
    const response = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (response) {
      return userToEntity(response);
    }

    return null;
  }

  public async update(
    id: string,
    body: UpdateUserBodyDto,
  ): Promise<UserEntity> {
    const response = await this.prisma.user.update({
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

    return userToEntity(response);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { active: false } });
  }
}
