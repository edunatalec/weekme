import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/database/prisma.service';
import { UserEntity } from '../../entities/user.entity';
import { Pageable } from 'src/core/interfaces/Pageable';

export type FindUserArgs =
  | { id: string; email?: never }
  | { id?: never; email: string };
export type FindUsersArgs = { page: number; size: number; name: string };
export type ActivateUserArgs = { userId: string; status: 'ACTIVE' | 'BLOCKED' };

@Injectable()
export class UserRepository {
  constructor(private readonly service: PrismaService) {}

  get user(): Prisma.UserDelegate {
    return this.service.user;
  }

  public async findUser(args: FindUserArgs): Promise<UserEntity | null> {
    const user = await this.service.user.findFirst({
      where: {
        OR: [{ id: { equals: args.id } }, { email: { equals: args.email } }],
      },
      select: {
        id: true,
        active: true,
        avatarUrl: true,
        email: true,
        fullName: true,
      },
    });

    return user ? new UserEntity(user) : null;
  }

  public async findUsers({
    page,
    size,
    name,
  }: FindUsersArgs): Promise<Pageable<UserEntity>> {
    const skipedElements = (page - 1) * size;

    const [total, users] = await this.service.$transaction([
      this.service.user.count({ where: { fullName: { contains: name } } }),
      this.service.user.findMany({
        where: { fullName: { contains: name, mode: 'insensitive' } },
        skip: skipedElements,
        take: size,
        select: {
          id: true,
          active: true,
          avatarUrl: true,
          createdAt: true,
          email: true,
          fullName: true,
          roles: true,
        },
      }),
    ]);

    return {
      content: users?.map((user) => new UserEntity(user)),
      totalElements: total,
      totalPages: total / page,
    };
  }

  public async activateUser(args: ActivateUserArgs): Promise<UserEntity> {
    const user = await this.service.user.update({
      where: { id: args.userId },
      data: { active: args.status === 'ACTIVE' },
    });

    return new UserEntity(user);
  }
}
