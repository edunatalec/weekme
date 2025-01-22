import { Injectable } from '@nestjs/common';
import { AnimeEntity, Pageable } from '@repo/core';
import { animeToEntity } from 'src/core/database/mappers/anime.mapper';
import { PrismaService } from 'src/core/database/service';
import { PrismaModule } from 'src/core/services/crud/constants';
import { PrismaCrudService } from 'src/core/services/crud/service';
import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create';
import { SearchAnimesQueryDto } from 'src/modules/animes/dtos/search';
import { UpdateAnimeBodyDto } from 'src/modules/animes/dtos/update';

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
      orderBy: [
        {
          weekday: 'asc',
        },
        {
          name: 'asc',
        },
      ],
      where: { name: { contains: query.name, mode: 'insensitive' } },
    });
  }

  public getById(id: string): Promise<AnimeEntity | null> {
    return this._getById({ id });
  }

  public async getByName(name: string): Promise<AnimeEntity | null> {
    const response = await this.delegate.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
      include: { seasons: true },
    });

    if (response) {
      return animeToEntity(response);
    }

    return null;
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
