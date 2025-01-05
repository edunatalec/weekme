import { Prisma } from '@prisma/client';
import {
  AnimeEntity,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from '@repo/core';

export type PrismaTypeMap = {
  user: {
    entity: UserEntity;
    include: Prisma.UserInclude;
    mapper: (value) => UserEntity;
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
    mapper: (value) => RoleEntity;
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
    mapper: (value) => PermissionEntity;
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
    mapper: (value) => AnimeEntity;
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
    mapper: (value) => SeasonEntity;
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
