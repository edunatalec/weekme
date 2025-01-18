import { Body, Param, Query } from '@nestjs/common';
import { Pageable, SeasonEntity } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data';
import {
  CreateSeasonEndpoint,
  DeleteSeasonEndpoint,
  GetSeasonByIdEndpoint,
  SearchSeasonsEndpoint,
  SeasonControllerDecorators,
  UpdateSeasonEndpoint,
} from 'src/modules/seasons/decorators';
import { CreateSeasonBodyDto } from 'src/modules/seasons/dtos/create';
import { DeleteSeasonByIdParamDto } from 'src/modules/seasons/dtos/delete';
import { GetSeasonByIdParamDto } from 'src/modules/seasons/dtos/get-by-id';
import { SearchSeasonsQueryDto } from 'src/modules/seasons/dtos/search';
import {
  UpdateSeasonBodyDto,
  UpdateSeasonByIdParamDto,
} from 'src/modules/seasons/dtos/update';
import {
  SeasonNotFoundException,
  SeasonsNotFoundException,
} from 'src/modules/seasons/exceptions';
import { SeasonService } from 'src/modules/seasons/service';

@SeasonControllerDecorators()
export class SeasonController {
  constructor(private readonly service: SeasonService) {}

  @SearchSeasonsEndpoint()
  public async search(
    @Query() query: SearchSeasonsQueryDto,
  ): Promise<Pageable<SeasonEntity>> {
    const response = await this.service.search(query);

    if (response) return response;

    throw new SeasonsNotFoundException();
  }

  @GetSeasonByIdEndpoint()
  public async getById(
    @CurrentData() season: SeasonEntity | undefined,
    @Param() _: GetSeasonByIdParamDto,
  ): Promise<SeasonEntity> {
    return this.validate(season);
  }

  @CreateSeasonEndpoint()
  public async create(
    @Body() body: CreateSeasonBodyDto,
  ): Promise<SeasonEntity> {
    return this.service.create(body);
  }

  @UpdateSeasonEndpoint()
  public async update(
    @CurrentData() season: SeasonEntity | undefined,
    @Param() _: UpdateSeasonByIdParamDto,
    @Body() body: UpdateSeasonBodyDto,
  ): Promise<SeasonEntity> {
    await this.validate(season);

    return this.service.update(season!.id, body);
  }

  @DeleteSeasonEndpoint()
  public async delete(
    @CurrentData() season: SeasonEntity | undefined,
    @Param() _: DeleteSeasonByIdParamDto,
  ): Promise<void> {
    await this.validate(season);

    await this.service.delete(season!.id);
  }

  private async validate(
    season: SeasonEntity | undefined,
  ): Promise<SeasonEntity> {
    if (season) return season;

    throw new SeasonNotFoundException();
  }
}
