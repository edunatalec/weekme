import { CrudAction } from 'src/modules/permissions/constants';
import {
  AnimeEntity,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from 'src/shared';

export type HandleRequiredPermissions<Resource extends keyof ResourceMap> =
  | string[]
  | ((user: UserEntity, data?: ResourceMap[Resource]['dataType']) => boolean);

export type ResourceMap = {
  users: {
    dataType: UserEntity;
    action: CrudAction;
  };
  roles: {
    dataType: RoleEntity;
    action: CrudAction;
  };
  permissions: {
    dataType: PermissionEntity;
    action: 'view' | 'update';
  };
  animes: {
    dataType: AnimeEntity;
    action: CrudAction;
  };
  seasons: {
    dataType: SeasonEntity;
    action: CrudAction;
  };
};
