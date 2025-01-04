import { CrudAction } from 'src/modules/permissions/constants';
import {
  AnimeEntity,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from 'src/shared';

export type HandleRequiredPermissions<Resource extends keyof ResourceMap> =
  | null
  | string[]
  | ((user: UserEntity, data?: ResourceMap[Resource]['dataType']) => boolean);

export type ResourceMap = {
  users: {
    dataType: UserEntity | Pick<UserEntity, 'id'>;
    action: CrudAction;
  };
  roles: {
    dataType: RoleEntity | Pick<RoleEntity, 'id'>;
    action: CrudAction;
  };
  permissions: {
    dataType: PermissionEntity | Pick<PermissionEntity, 'id'>;
    action: 'view' | 'update';
  };
  animes: {
    dataType: AnimeEntity | Pick<AnimeEntity, 'id'>;
    action: CrudAction;
  };
  seasons: {
    dataType: SeasonEntity | Pick<SeasonEntity, 'id'>;
    action: CrudAction;
  };
};
