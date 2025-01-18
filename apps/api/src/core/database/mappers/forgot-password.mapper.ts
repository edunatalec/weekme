import { ForgotPasswordEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';

export const forgotPasswordToEntity = (
  forgotPassword,
): ForgotPasswordEntity => {
  return {
    code: forgotPassword.code,
    expiresAt: forgotPassword.expiresAt,
    ...baseToEntity(forgotPassword),
  };
};
