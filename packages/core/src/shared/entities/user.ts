import { BaseEntity } from 'src/shared/entities/base';
import { ForgotPasswordEntity } from 'src/shared/entities/forgot-password';
import { RoleEntity } from 'src/shared/entities/role';

export interface UserEntity extends BaseEntity {
  readonly fullName: string;
  readonly email: string;
  readonly avatarUrl?: string;
  readonly roles: RoleEntity[];
  readonly forgotPassword?: ForgotPasswordEntity;
}
