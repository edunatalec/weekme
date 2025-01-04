import { userContainsPermission } from 'src/modules/permissions/helpers';
import {
  HandleRequiredPermissions,
  ResourceMap,
} from 'src/modules/permissions/types';

export const ACCESS_CONTROLS: {
  [Resource in keyof ResourceMap]: {
    [CrudAction in ResourceMap[Resource]['action']]: HandleRequiredPermissions<Resource>;
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

export const MASTER_PERMISSIONS = ['admin'];
