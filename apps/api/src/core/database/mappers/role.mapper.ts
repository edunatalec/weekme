import { RoleEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';
import { permissionToEntity } from 'src/core/database/mappers/permission.mapper';

export const roleToEntity = (role): RoleEntity => {
  return {
    name: role.name,
    description: role.description,
    permissions: role.permissions.map((permission) =>
      permissionToEntity(permission),
    ),
    ...baseToEntity(role),
  };
};
