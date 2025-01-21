import { Injectable } from '@nestjs/common';
import { Schedule, WEEKDAYS } from '@repo/core';
import { animeToEntity } from 'src/core/database/mappers/anime.mapper';
import { PrismaService } from 'src/core/database/service';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAnimes(): Promise<Schedule[]> {
    const response = await this.prisma.anime.findMany({
      where: { status: 'RELEASING' },
    });

    const animes = response.map((anime) => animeToEntity(anime));

    const currentDay = new Date().getDay();

    return [
      ...WEEKDAYS.slice(currentDay),
      ...WEEKDAYS.slice(0, currentDay),
    ].map((weekday) => {
      const index = WEEKDAYS.findIndex((element) => element === weekday);

      return {
        weekday,
        animes: animes.filter((anime) => anime.weekday === index),
      };
    });
  }
}
