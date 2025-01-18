import { BaseEntity } from 'src/shared/entities/base';

export interface ForgotPasswordEntity extends BaseEntity {
  readonly code: string;
  readonly expiresAt: Date;
}
