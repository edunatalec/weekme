import { AnimeEntity } from 'src/shared/entities';

export interface Schedule {
  weekday: string;
  animes: AnimeEntity[];
}
