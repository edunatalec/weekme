import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, ProtectedResource, SeasonEntity } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data.decorator';
import { RequiredResource } from 'src/core/decorators/required-resource.decorator';
import {
  CreateSeasonEndpoint,
  DeleteSeasonEndpoint,
  GetSeasonByIdEndpoint,
  SearchSeasonsEndpoint,
  UpdateSeasonEndpoint,
} from 'src/modules/seasons/decorators';
import { CreateSeasonBodyDto } from 'src/modules/seasons/dtos/create.dto';
import { DeleteSeasonByIdParamDto } from 'src/modules/seasons/dtos/delete.dto';
import { GetSeasonByIdParamDto } from 'src/modules/seasons/dtos/get-by-id.dto';
import { SearchSeasonsQueryDto } from 'src/modules/seasons/dtos/search.dto';
import {
  UpdateSeasonBodyDto,
  UpdateSeasonByIdParamDto,
} from 'src/modules/seasons/dtos/update.dto';
import {
  SeasonNotFoundException,
  SeasonsNotFoundException,
} from 'src/modules/seasons/exceptions';
import { SeasonService } from 'src/modules/seasons/service';

@ApiBearerAuth()
@ApiTags('Temporadas')
@Controller('seasons')
@RequiredResource(ProtectedResource.SEASONS)
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
    return this.verifySeason(season);
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
    await this.verifySeason(season);

    return this.service.update(season.id, body);
  }

  @DeleteSeasonEndpoint()
  public async delete(
    @CurrentData() season: SeasonEntity | undefined,
    @Param() _: DeleteSeasonByIdParamDto,
  ): Promise<void> {
    await this.verifySeason(season);

    await this.service.delete(season.id);
  }

  private async verifySeason(
    season: SeasonEntity | undefined,
  ): Promise<SeasonEntity> {
    if (season) return season;

    throw new SeasonNotFoundException();
  }
}
