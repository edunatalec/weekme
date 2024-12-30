import { AnimeScheduleEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';

export const animeScheduleToEntity = (schedule): AnimeScheduleEntity => {
  return {
    year: schedule.year,
    weekday: schedule.weekday,
    startDate: schedule.startDate,
    finishDate: schedule.finishDate,
    ...baseToEntity(schedule),
  };
};
