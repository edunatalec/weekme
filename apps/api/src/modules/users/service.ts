import { Injectable } from '@nestjs/common';
import { Pageable, UserEntity } from '@repo/core/dist';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { SearchUsersQueryDto } from 'src/modules/users/dtos/search.dto';
import { UpdateUserBodyDto } from 'src/modules/users/dtos/update.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async search(
    query: SearchUsersQueryDto,
  ): Promise<Pageable<UserEntity> | null> {
    const skip = (query.page - 1) * query.size;

    const count = await this.prisma.user.count({
      where: { fullName: { contains: query.name, mode: 'insensitive' } },
    });

    if (count === 0) {
      return null;
    }

    const users = await this.prisma.user.findMany({
      skip,
      take: query.size,
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

    return {
      data: users.map((user) => userToEntity(user)),
      meta: {
        count,
        page: query.page,
        totalPages: Math.ceil(count / query.size),
      },
    };
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
