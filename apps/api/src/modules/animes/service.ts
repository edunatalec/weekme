import { Injectable } from '@nestjs/common';
import { AnimeEntity, Pageable } from '@repo/core';
import { animeToEntity } from 'src/core/database/mappers/anime.mapper';
import { PrismaService } from 'src/core/database/prisma.service';
import { PaginationService } from 'src/core/services/pagination.service';
import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create.dto';
import { SearchAnimesQueryDto } from 'src/modules/animes/dtos/search.dto';
import { UpdateAnimeBodyDto } from 'src/modules/animes/dtos/update.dto';

@Injectable()
export class AnimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) {}

  public async search(
    query: SearchAnimesQueryDto,
  ): Promise<Pageable<AnimeEntity>> {
    return this.pagination.search<'anime'>({
      module: 'anime',
      mapper: animeToEntity,
      page: query.page,
      size: query.size,
      orderBy: {
        name: 'asc',
      },
      where: { name: { contains: query.name, mode: 'insensitive' } },
      include: {
        seasons: true,
      },
    });
  }

  public async getById(id: string): Promise<AnimeEntity | null> {
    const response = await this.prisma.anime.findUnique({
      where: { id },
      include: {
        seasons: true,
      },
    });

    return animeToEntity(response);
  }

  public async create(body: CreateAnimeBodyDto): Promise<AnimeEntity> {
    const response = await this.prisma.anime.create({
      data: {
        ...body,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        finishDate: body.finishDate ? new Date(body.finishDate) : undefined,
      },
      include: {
        seasons: true,
      },
    });

    return animeToEntity(response);
  }

  public async update(
    id: string,
    body: UpdateAnimeBodyDto,
  ): Promise<AnimeEntity> {
    const response = await this.prisma.anime.update({
      where: { id },
      data: {
        ...body,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        finishDate: body.finishDate ? new Date(body.finishDate) : undefined,
      },
      include: {
        seasons: true,
      },
    });

    return animeToEntity(response);
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.anime.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
