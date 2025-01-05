import { ProtectedResource } from '@repo/core';
import { animeToEntity } from 'src/core/database/mappers/anime.mapper';
import { permissionToEntity } from 'src/core/database/mappers/permission.mapper';
import { roleToEntity } from 'src/core/database/mappers/role.mapper';
import { seasonToEntity } from 'src/core/database/mappers/season.mapper';
import { userToEntity } from 'src/core/database/mappers/user.mapper';
import { PrismaModule } from 'src/core/services/crud/constants';
import { PrismaTypeMap } from 'src/core/services/crud/types';

export const PERMISSION_MAP = <
  {
    [Key in keyof PrismaTypeMap]: {
      mapper: PrismaTypeMap[Key]['mapper'];
      include?: PrismaTypeMap[Key]['include'];
    };
  }
>{
  user: {
    mapper: userToEntity,
    include: {
      roles: {
        include: {
          permissions: true,
        },
      },
    },
  },
  role: {
    mapper: roleToEntity,
    include: {
      permissions: true,
    },
  },
  permission: {
    mapper: permissionToEntity,
  },
  anime: {
    mapper: animeToEntity,
    include: {
      seasons: true,
    },
  },
  season: {
    mapper: seasonToEntity,
  },
};

export const RESOURCE_TO_PRISMA_MODULE = <
  { [Resource in ProtectedResource]: PrismaModule }
>{
  users: PrismaModule.USERS,
  roles: PrismaModule.ROLES,
  permissions: PrismaModule.PERMISSIONS,
  animes: PrismaModule.ANIMES,
  seasons: PrismaModule.SEASONS,
};
