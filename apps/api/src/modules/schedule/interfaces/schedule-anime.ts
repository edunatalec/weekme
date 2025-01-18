import { AnimeEntity } from '@repo/core';

export interface ScheduleAnime {
  weekday: string;
  animes: AnimeEntity[];
}
