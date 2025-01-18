import { BaseEntity } from 'src/shared/entities/base';

export interface PermissionEntity extends BaseEntity {
  readonly identifier: string;
  readonly name: string;
  readonly description: string;
}
