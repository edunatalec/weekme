import { Injectable } from '@nestjs/common';
import { UserEntity } from '@repo/core/dist';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { Pageable } from 'src/core/interfaces/pageable';
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
    const response = await this.prisma.user.findFirst({
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
    console.log(id);
    console.log(body);
    return;
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { active: false } });
  }
}
