import { UserEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';
import { forgotPasswordToEntity } from 'src/core/database/mappers/forgot-password.mapper';
import { roleToEntity } from 'src/core/database/mappers/role.mapper';

export const userToEntity = (user): UserEntity => {
  return {
    fullName: user.fullName,
    email: user.email,
    roles: (user.roles ?? []).map((role) => roleToEntity(role)),
    avatarUrl: user.avatarUrl || undefined,
    forgotPassword:
      user.forgotPassword && forgotPasswordToEntity(user.forgotPassword),
    ...baseToEntity(user),
  };
};
