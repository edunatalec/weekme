import { Injectable } from '@nestjs/common';
import { Pageable, SeasonEntity } from '@repo/core';
import { seasonToEntity } from 'src/core/database/mappers/season.mapper';
import { PrismaService } from 'src/core/database/service';
import { PrismaModule } from 'src/core/services/crud/constants';
import { PrismaCrudService } from 'src/core/services/crud/service';
import { CreateSeasonBodyDto } from 'src/modules/seasons/dtos/create';
import { SearchSeasonsQueryDto } from 'src/modules/seasons/dtos/search';
import { UpdateSeasonBodyDto } from 'src/modules/seasons/dtos/update';

@Injectable()
export class SeasonService extends PrismaCrudService<PrismaModule.SEASONS> {
  constructor(prisma: PrismaService) {
    super(prisma.season, {}, seasonToEntity);
  }

  public search(
    query: SearchSeasonsQueryDto,
  ): Promise<Pageable<SeasonEntity> | null> {
    return this._search({
      page: query.page,
      size: query.size,
      orderBy: [
        {
          year: 'desc',
        },
        {
          show: 'desc',
        },
        {
          name: 'asc',
        },
      ],
      where: { year: query.year },
    });
  }

  public getById(id: string): Promise<SeasonEntity | null> {
    return this._getById({ id });
  }

  public create(body: CreateSeasonBodyDto): Promise<SeasonEntity> {
    return this._create({ data: body });
  }

  public update(id: string, body: UpdateSeasonBodyDto): Promise<SeasonEntity> {
    return this._update({
      id,
      data: body,
    });
  }

  public async delete(id: string): Promise<void> {
    return this._delete({ id });
  }
}
