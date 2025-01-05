import { ACCESS_CONTROLS } from 'src/modules/permissions/config';
import { userContainsPermission } from 'src/modules/permissions/helpers';
import { ResourceMap } from 'src/modules/permissions/types';
import { UserEntity } from 'src/shared';

interface HasPermissionProps<Resource extends keyof ResourceMap> {
  readonly user: UserEntity | null;
  readonly resource: Resource;
  readonly action: ResourceMap[Resource]['action'];
  readonly data?: ResourceMap[Resource]['dataType'];
}

type HasPermission = <Resource extends keyof ResourceMap>(
  props: HasPermissionProps<Resource>
) => boolean;

export const hasPermission: HasPermission = <
  Resource extends keyof ResourceMap,
>({
  user,
  resource,
  action,
  data,
}: HasPermissionProps<Resource>): boolean => {
  if (!user) return false;
  const requiredPermissions = ACCESS_CONTROLS[resource]?.[action];

  if (requiredPermissions === undefined) {
    return userContainsPermission({
      user,
      requiredPermissions: [`${resource}:${action}`],
    });
  } else if (Array.isArray(requiredPermissions)) {
    return userContainsPermission({ user, requiredPermissions });
  }

  return requiredPermissions(user, data);
};
