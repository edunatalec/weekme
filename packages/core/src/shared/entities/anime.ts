import { BaseEntity } from 'src/shared/entities/base';
import { SeasonEntity } from 'src/shared/entities/season';

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
  readonly weekday: number;
  readonly startDate: Date;
  readonly finishDate: Date;
  readonly seasons: SeasonEntity[];
}
