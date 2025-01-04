import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, ProtectedResource, SeasonEntity } from '@repo/core';
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
@ApiTags('Seasons')
@Controller('seasons')
@RequiredResource(ProtectedResource.SEASONS)
export class SeasonController {
  constructor(private readonly service: SeasonService) {}

  @SearchSeasonsEndpoint()
  public async search(
    @Query() query: SearchSeasonsQueryDto,
  ): Promise<Pageable<SeasonEntity>> {
    const response = await this.service.search(query);

    if (!response) {
      throw new SeasonsNotFoundException();
    }

    return response;
  }

  @GetSeasonByIdEndpoint()
  public async getById(
    @Param() param: GetSeasonByIdParamDto,
  ): Promise<SeasonEntity> {
    return this.verifySeasonById(param.id);
  }

  @CreateSeasonEndpoint()
  public async create(
    @Body() body: CreateSeasonBodyDto,
  ): Promise<SeasonEntity> {
    return this.service.create(body);
  }

  @UpdateSeasonEndpoint()
  public async update(
    @Param() param: UpdateSeasonByIdParamDto,
    @Body() body: UpdateSeasonBodyDto,
  ): Promise<SeasonEntity> {
    await this.verifySeasonById(param.id);

    return this.service.update(param.id, body);
  }

  @DeleteSeasonEndpoint()
  public async delete(@Param() param: DeleteSeasonByIdParamDto): Promise<void> {
    await this.verifySeasonById(param.id);

    await this.service.delete(param.id);
  }

  private async verifySeasonById(id: string): Promise<SeasonEntity> {
    const season = await this.service.getById(id);

    if (!season) {
      throw new SeasonNotFoundException();
    }

    return season;
  }
}
