import {
  AnimeEntity,
  PermissionEntity,
  RoleEntity,
  SeasonEntity,
  UserEntity,
} from 'src/shared/entities';

export type Action = 'view' | 'create' | 'update' | 'delete';

export enum Module {
  users = 'users',
  roles = 'roles',
  permissions = 'permissions',
  animes = 'animes',
  seasons = 'seasons',
}

type HandleRequiredPermissions<Module extends keyof TypedModules> =
  | null
  | string[]
  | ((user: UserEntity, data?: TypedModules[Module]['dataType']) => boolean);

export type TypedModules = {
  users: {
    dataType: UserEntity | Pick<UserEntity, 'id'>;
    action: Action;
  };
  roles: {
    dataType: RoleEntity | Pick<RoleEntity, 'id'>;
    action: Action;
  };
  permissions: {
    dataType: PermissionEntity | Pick<PermissionEntity, 'id'>;
    action: 'view' | 'update';
  };
  animes: {
    dataType: AnimeEntity | Pick<AnimeEntity, 'id'>;
    action: Action;
  };
  seasons: {
    dataType: SeasonEntity | Pick<SeasonEntity, 'id'>;
    action: Action;
  };
};

const MODULES: {
  [Module in keyof TypedModules]: {
    [Action in TypedModules[Module]['action']]: HandleRequiredPermissions<Module>;
  };
} = {
  users: {
    view: null,
    create: null,
    update: (sessionUser, user) => {
      if (!user) return false;

      if ('roles' in user) {
        return !userContainsPermission({
          user,
          requiredPermissions: ['admin'],
        });
      }

      return userContainsPermission({
        user: sessionUser,
        requiredPermissions: ['users:update'],
      });
    },
    delete: (sessionUser, user) => {
      if (!user || sessionUser.id === user?.id) {
        return false;
      }

      if ('roles' in user) {
        return !userContainsPermission({
          user,
          requiredPermissions: ['admin'],
        });
      }

      return userContainsPermission({
        user: sessionUser,
        requiredPermissions: ['users:delete'],
      });
    },
  },
  roles: {
    view: null,
    create: null,
    update: null,
    delete: null,
  },
  permissions: {
    view: null,
    update: null,
  },
  animes: {
    view: null,
    create: null,
    update: null,
    delete: null,
  },
  seasons: {
    view: null,
    create: null,
    update: null,
    delete: null,
  },
};

const MASTER_PERMISSIONS = ['admin'];

interface HasPermissionProps<Module extends keyof TypedModules> {
  readonly user: UserEntity | null;
  readonly module: Module;
  readonly action: TypedModules[Module]['action'];
  readonly data?: TypedModules[Module]['dataType'];
}

type HasPermission = <Module extends keyof TypedModules>(
  props: HasPermissionProps<Module>
) => boolean;

export const hasPermission: HasPermission = <
  Module extends keyof TypedModules,
>({
  user,
  module,
  action,
  data,
}: HasPermissionProps<Module>): boolean => {
  if (!user) return false;

  const requiredPermissions = MODULES[module][action];

  if (requiredPermissions === null) {
    return userContainsPermission({
      user,
      requiredPermissions: [`${module}:${action}`],
    });
  } else if (Array.isArray(requiredPermissions)) {
    return userContainsPermission({ user, requiredPermissions });
  }

  return requiredPermissions(user, data);
};

interface UserContainsPermissionProps {
  readonly user: UserEntity;
  readonly requiredPermissions: string[];
}

const userContainsPermission = ({
  user,
  requiredPermissions,
}: UserContainsPermissionProps) => {
  return user.roles.some((role) =>
    role.permissions.some((permission) =>
      [...requiredPermissions, ...MASTER_PERMISSIONS].includes(
        permission.identifier
      )
    )
  );
};
