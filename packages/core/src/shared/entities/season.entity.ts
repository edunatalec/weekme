import { BaseEntity } from 'src/shared/entities/base.entity';

export enum SeasonName {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
  WINTER = 'WINTER',
}

export interface SeasonEntity extends BaseEntity {
  readonly name: SeasonName;
  readonly year: number;
  readonly beginAt: Date;
  readonly endAt: Date;
}
