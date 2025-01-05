import { PermissionEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';

export const permissionToEntity = (permission): PermissionEntity => {
  return {
    name: permission.name,
    identifier: permission.identifier,
    description: permission.description,
    ...baseToEntity(permission),
  };
};
