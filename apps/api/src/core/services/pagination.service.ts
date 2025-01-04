import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  AnimeEntity,
  Pageable,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from '@repo/core';
import { PrismaService } from 'src/core/database/prisma.service';

type PaginationType = {
  user: {
    entity: UserEntity;
    where: Prisma.UserWhereInput;
    include: Prisma.UserInclude;
    orderBy:
      | Prisma.UserOrderByWithRelationInput
      | Prisma.UserOrderByWithRelationInput[];
  };
  role: {
    entity: RoleEntity;
    where: Prisma.RoleWhereInput;
    include: Prisma.RoleInclude;
    orderBy:
      | Prisma.RoleOrderByWithRelationInput
      | Prisma.RoleOrderByWithRelationInput[];
  };
  permission: {
    entity: PermissionEntity;
    where: Prisma.PermissionWhereInput;
    include: Prisma.PermissionInclude;
    orderBy:
      | Prisma.PermissionOrderByWithRelationInput
      | Prisma.PermissionOrderByWithRelationInput[];
  };
  anime: {
    entity: AnimeEntity;
    where: Prisma.AnimeWhereInput;
    include: Prisma.AnimeInclude;
    orderBy:
      | Prisma.AnimeOrderByWithRelationInput
      | Prisma.AnimeOrderByWithRelationInput[];
  };
  season: {
    entity: SeasonEntity;
    where: Prisma.SeasonWhereInput;
    include: Prisma.SeasonInclude;
    orderBy:
      | Prisma.SeasonOrderByWithRelationInput
      | Prisma.SeasonOrderByWithRelationInput[];
  };
};

interface SearchParams<Module extends keyof PaginationType> {
  module: Module;
  where: PaginationType[Module]['where'];
  include: PaginationType[Module]['include'];
  orderBy: PaginationType[Module]['orderBy'];
  size: number;
  page: number;
  mapper: (value) => PaginationType[Module]['entity'];
}

@Injectable()
export class PaginationService {
  constructor(private readonly prisma: PrismaService) {}

  public async search<Module extends keyof PaginationType>({
    module,
    where,
    include,
    orderBy,
    size,
    page,
    mapper,
  }: SearchParams<Module>): Promise<
    Pageable<PaginationType[Module]['entity']>
  > {
    const entity: any = this.prisma[module];
    const skip = (page - 1) * size;

    const count = await entity.count({
      where,
    });

    if (count === 0) {
      return null;
    }

    const items = await entity.findMany({
      skip,
      take: size,
      orderBy,
      where,
      include,
    });

    return {
      data: items.map((item) => mapper(item)),
      meta: {
        count,
        page,
        totalPages: Math.ceil(count / size),
      },
    };
  }
}
