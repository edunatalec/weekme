import { BaseEntity } from 'src/shared/entities/base.entity';
import { SeasonEntity } from 'src/shared/entities/season.entity';

export enum AnimeStatus {
  FINISHED = 'FINISHED',
  RELEASING = 'RELEASING',
  TO_RELEASE = 'TO_RELEASE',
  HIATUS = 'HIATUS',
}

export interface AnimeEntity extends BaseEntity {
  readonly name: string;
  readonly backgroundUrl?: string;
  readonly imageUrl: string;
  readonly status: AnimeStatus;
  readonly synopsis: string;
  readonly year: number;
  readonly weekday: number;
  readonly startDate: Date;
  readonly finishDate: Date;
  readonly seasons: SeasonEntity[];
}
