import { SeasonEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';

export const seasonToEntity = (season): SeasonEntity => {
  return {
    name: season.name,
    year: season.year,
    show: season.show,
    ...baseToEntity(season),
  };
};
