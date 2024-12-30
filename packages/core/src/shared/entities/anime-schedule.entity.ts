import { BaseEntity } from 'src/shared/entities/base.entity';

export interface AnimeScheduleEntity extends BaseEntity {
  readonly year: number;
  readonly weekday: number;
  readonly startDate: Date;
  readonly finishDate: Date;
}
