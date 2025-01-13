import { userContainsPermission } from 'src/modules/permissions/helpers';
import {
  HandleRequiredPermissions,
  ResourceMap,
} from 'src/modules/permissions/types';

export const ACCESS_CONTROLS: {
  [Resource in keyof ResourceMap]?: {
    [CrudAction in ResourceMap[Resource]['action']]?: HandleRequiredPermissions<Resource>;
  };
} = {
  users: {
    update: (sessionUser, user) => {
      if (!user) return false;

      const userHasMasterPermission = userContainsPermission({ user });

      if (userHasMasterPermission) return false;

      return userContainsPermission({
        user: sessionUser,
        requiredPermissions: ['users:update'],
      });
    },
    delete: (sessionUser, user) => {
      if (!user) return false;

      const userHasMasterPermission = userContainsPermission({ user });

      if (userHasMasterPermission) return false;

      return userContainsPermission({
        user: sessionUser,
        requiredPermissions: ['users:delete'],
      });
    },
  },
  roles: {
    update: (sessionUser, role) => {
      if (!role) return false;

      if (role.name.match(/^(Admin)$/)) return false;

      return userContainsPermission({
        user: sessionUser,
        requiredPermissions: ['roles:update'],
      });
    },
    delete: (sessionUser, role) => {
      if (!role) return false;

      if (role.name.match(/^(Admin)$/)) return false;

      return userContainsPermission({
        user: sessionUser,
        requiredPermissions: ['roles:update'],
      });
    },
  },
};

export const MASTER_PERMISSIONS = ['admin'];
