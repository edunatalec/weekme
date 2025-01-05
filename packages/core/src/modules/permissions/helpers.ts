import { MASTER_PERMISSIONS } from 'src/modules/permissions/config';
import { UserEntity } from 'src/shared';

interface UserContainsPermissionProps {
  readonly user: UserEntity;
  readonly requiredPermissions?: string[];
}

export const userContainsPermission = ({
  user,
  requiredPermissions = [],
}: UserContainsPermissionProps) => {
  return user.roles.some((role) =>
    role.permissions.some((permission) =>
      [...requiredPermissions, ...MASTER_PERMISSIONS].includes(
        permission.identifier
      )
    )
  );
};
