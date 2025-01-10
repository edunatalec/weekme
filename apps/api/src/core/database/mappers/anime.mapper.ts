import { AnimeEntity } from '@repo/core';
import { baseToEntity } from 'src/core/database/mappers/base.mapper';
import { seasonToEntity } from 'src/core/database/mappers/season.mapper';

export const animeToEntity = (anime): AnimeEntity => {
  return {
    name: anime.name,
    imageUrl: anime.imageUrl,
    backgroundUrl: anime.backgroundUrl,
    synopsis: anime.synopsis,
    status: anime.status,
    weekday: anime.weekday,
    startDate: anime.startDate,
    finishDate: anime.finishDate,
    seasons: anime.seasons.map((season) => seasonToEntity(season)),
    ...baseToEntity(anime),
  };
};
