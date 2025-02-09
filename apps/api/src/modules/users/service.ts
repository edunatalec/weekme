import { Injectable } from '@nestjs/common';
import { Pageable, UserEntity } from '@repo/core';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaService } from 'src/core/database/service';
import { PrismaModule } from 'src/core/services/crud/constants';
import { PrismaCrudService } from 'src/core/services/crud/service';
import { SearchUsersQueryDto } from 'src/modules/users/dtos/search';
import { UpdateUserBodyDto } from 'src/modules/users/dtos/update';

@Injectable()
export class UserService extends PrismaCrudService<PrismaModule.USERS> {
  constructor(prisma: PrismaService) {
    super(
      prisma.user,
      {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
      userToEntity,
    );
  }

  public search(
    query: SearchUsersQueryDto,
  ): Promise<Pageable<UserEntity> | null> {
    return this._search({
      page: query.page,
      size: query.size,
      orderBy: {
        fullName: 'asc',
      },
      where: { fullName: { contains: query.name, mode: 'insensitive' } },
    });
  }

  public getById(id: string): Promise<UserEntity | null> {
    return this._getById({ id });
  }

  public update(id: string, body: UpdateUserBodyDto): Promise<UserEntity> {
    const { roleIds, ...data } = body;

    return this._update({
      id,
      data: {
        ...data,
        ...(roleIds && {
          roles: {
            set: roleIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  public async delete(id: string): Promise<void> {
    return this._delete({ id });
  }
}
