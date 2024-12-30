import { BaseEntity } from 'src/shared/entities/base.entity';
import { PermissionEntity } from 'src/shared/entities/permission.entity';

export interface RoleEntity extends BaseEntity {
  readonly name: string;
  readonly description: string;
  readonly permissions: PermissionEntity[];
}
