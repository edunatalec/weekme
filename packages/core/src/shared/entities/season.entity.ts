import { BaseEntity } from 'src/shared/entities/base.entity';

export interface SeasonEntity extends BaseEntity {
  readonly name: string;
  readonly beginAt: Date;
  readonly endAt: Date;
}
