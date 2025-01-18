import { BaseEntity } from 'src/shared/entities/base';
import { PermissionEntity } from 'src/shared/entities/permission';

export interface RoleEntity extends BaseEntity {
  readonly name: string;
  readonly description: string;
  readonly permissions: PermissionEntity[];
}
