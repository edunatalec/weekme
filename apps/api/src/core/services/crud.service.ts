import { Anime, Permission, Prisma, Role, Season, User } from '@prisma/client';
import {
  AnimeEntity,
  Pageable,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from '@repo/core';
import { PrismaService } from 'src/core/database/prisma.service';

export enum PrismaModule {
  USERS = 'user',
  ROLES = 'role',
  PERMISSIONS = 'permission',
  ANIMES = 'anime',
  SEASONS = 'season',
}

type PrismaTypeMap = {
  user: {
    entity: UserEntity;
    include: Prisma.UserInclude;
    mapper: (value: User) => UserEntity;
    search: {
      page: number;
      size: number;
      where?: Prisma.UserWhereInput;
      orderBy?:
        | Prisma.UserOrderByWithRelationInput
        | Prisma.UserOrderByWithRelationInput[];
    };
    getById: {
      id: string;
    };
    create: {
      data: Prisma.UserCreateInput;
    };
    update: {
      id: string;
      data: Prisma.UserUpdateInput;
    };
    delete: {
      id: string;
    };
  };
  role: {
    entity: RoleEntity;
    include: Prisma.RoleInclude;
    mapper: (value: Role) => RoleEntity;
    search: {
      page: number;
      size: number;
      where?: Prisma.RoleWhereInput;
      orderBy?:
        | Prisma.RoleOrderByWithRelationInput
        | Prisma.RoleOrderByWithRelationInput[];
    };
    getById: {
      id: string;
    };
    create: {
      data: Prisma.RoleCreateInput;
    };
    update: {
      id: string;
      data: Prisma.RoleUpdateInput;
    };
    delete: {
      id: string;
    };
  };
  permission: {
    entity: PermissionEntity;
    include: Prisma.PermissionInclude;
    mapper: (value: Permission) => PermissionEntity;
    search: {
      page: number;
      size: number;
      where?: Prisma.PermissionWhereInput;
      orderBy?:
        | Prisma.PermissionOrderByWithRelationInput
        | Prisma.PermissionOrderByWithRelationInput[];
    };
    getById: {
      id: string;
    };
    create: {
      data: Prisma.PermissionCreateInput;
    };
    update: {
      id: string;
      data: Prisma.PermissionUpdateInput;
    };
    delete: {
      id: string;
    };
  };
  anime: {
    entity: AnimeEntity;
    include: Prisma.AnimeInclude;
    mapper: (value: Anime) => AnimeEntity;
    search: {
      page: number;
      size: number;
      where?: Prisma.AnimeWhereInput;
      orderBy?:
        | Prisma.AnimeOrderByWithRelationInput
        | Prisma.AnimeOrderByWithRelationInput[];
    };
    getById: {
      id: string;
    };
    create: {
      data: Prisma.AnimeCreateInput;
    };
    update: {
      id: string;
      data: Prisma.AnimeUpdateInput;
    };
    delete: {
      id: string;
    };
  };
  season: {
    entity: SeasonEntity;
    include: Prisma.SeasonInclude;
    mapper: (value: Season) => SeasonEntity;
    search: {
      page: number;
      size: number;
      where?: Prisma.SeasonWhereInput;
      orderBy?:
        | Prisma.SeasonOrderByWithRelationInput
        | Prisma.SeasonOrderByWithRelationInput[];
    };
    getById: {
      id: string;
    };
    create: {
      data: Prisma.SeasonCreateInput;
    };
    update: {
      id: string;
      data: Prisma.SeasonUpdateInput;
    };
    delete: {
      id: string;
    };
  };
};

export class PrismaCrudService<Module extends keyof PrismaTypeMap> {
  constructor(
    protected readonly delegate: PrismaService[Module],
    protected readonly include: PrismaTypeMap[Module]['include'],
    protected readonly mapper: PrismaTypeMap[Module]['mapper'],
  ) {}

  private get _delegate(): any {
    return this.delegate;
  }

  protected async _search(
    args: PrismaTypeMap[Module]['search'],
  ): Promise<Pageable<PrismaTypeMap[Module]['entity']> | null> {
    const skip = (args.page - 1) * args.size;

    const count = await this._delegate.count({
      where: args.where,
    });

    if (count === 0) return null;

    const items = await this._delegate.findMany({
      skip,
      take: args.size,
      orderBy: args.orderBy,
      where: args.where,
      include: this.include,
    });

    return {
      data: items.map((item) => this.mapper(item)),
      meta: {
        count,
        page: args.page,
        totalPages: Math.ceil(count / args.size),
      },
    };
  }

  protected async _getById(
    args: PrismaTypeMap[Module]['getById'],
  ): Promise<PrismaTypeMap[Module]['entity'] | null> {
    const response = await this._delegate.findUnique({
      where: { id: args.id },
      include: this.include,
    });

    if (response) {
      return this.mapper(response);
    }

    return null;
  }

  protected async _create(
    args: PrismaTypeMap[Module]['create'],
  ): Promise<PrismaTypeMap[Module]['entity']> {
    const response = await this._delegate.create({
      data: args.data,
      include: this.include,
    });

    return this.mapper(response);
  }

  protected async _update(
    args: PrismaTypeMap[Module]['update'],
  ): Promise<PrismaTypeMap[Module]['entity']> {
    const response = await this._delegate.update({
      where: { id: args.id },
      data: args.data,
      include: this.include,
    });

    return this.mapper(response);
  }

  protected async _delete(
    args: PrismaTypeMap[Module]['delete'],
  ): Promise<void> {
    await this._delegate.update({
      where: { id: args.id },
      data: { active: false },
    });
  }
}
