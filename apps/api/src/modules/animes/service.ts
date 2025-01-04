import { Injectable } from '@nestjs/common';
import { AnimeEntity, Pageable } from '@repo/core';
import { animeToEntity } from 'src/core/database/mappers/anime.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import {
  PrismaCrudService,
  PrismaModule,
} from 'src/core/services/crud.service';
import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create.dto';
import { SearchAnimesQueryDto } from 'src/modules/animes/dtos/search.dto';
import { UpdateAnimeBodyDto } from 'src/modules/animes/dtos/update.dto';

@Injectable()
export class AnimeService extends PrismaCrudService<PrismaModule.ANIMES> {
  constructor(prisma: PrismaService) {
    super(prisma.anime, { seasons: true }, animeToEntity);
  }

  public search(
    query: SearchAnimesQueryDto,
  ): Promise<Pageable<AnimeEntity> | null> {
    return this._search({
      page: query.page,
      size: query.size,
      orderBy: {
        name: 'asc',
      },
      where: { name: { contains: query.name, mode: 'insensitive' } },
    });
  }

  public getById(id: string): Promise<AnimeEntity | null> {
    return this._getById({ id });
  }

  public create(body: CreateAnimeBodyDto): Promise<AnimeEntity> {
    const { seasonIds, ...data } = body;

    return this._create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        finishDate: data.finishDate ? new Date(data.finishDate) : undefined,
        ...(seasonIds && {
          seasons: {
            connect: seasonIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  public update(id: string, body: UpdateAnimeBodyDto): Promise<AnimeEntity> {
    const { seasonIds, ...data } = body;

    return this._update({
      id,
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        finishDate: data.finishDate ? new Date(data.finishDate) : undefined,
        ...(seasonIds && {
          seasons: {
            set: seasonIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  public async delete(id: string): Promise<void> {
    return this._delete({ id });
  }
}
