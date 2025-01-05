import { BaseEntity } from 'src/shared/entities/base.entity';
import { RoleEntity } from 'src/shared/entities/role.entity';

export interface UserEntity extends BaseEntity {
  readonly fullName: string;
  readonly email: string;
  readonly avatarUrl?: string;
  readonly roles: RoleEntity[];
}
