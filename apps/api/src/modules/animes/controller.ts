import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnimeEntity, Module, Pageable } from '@repo/core';
import { PermissionModule } from 'src/core/decorators/permission-module.decorator';
import {
  CreateAnimeEndpoint,
  DeleteAnimeEndpoint,
  GetAnimeByIdEndpoint,
  SearchAnimesEndpoint,
  UpdateAnimeEndpoint,
} from 'src/modules/animes/decorators';
import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create.dto';
import { DeleteAnimeByIdParamDto } from 'src/modules/animes/dtos/delete.dto';
import { GetAnimeByIdParamDto } from 'src/modules/animes/dtos/get-by-id.dto';
import { SearchAnimesQueryDto } from 'src/modules/animes/dtos/search.dto';
import {
  UpdateAnimeBodyDto,
  UpdateAnimeByIdParamDto,
} from 'src/modules/animes/dtos/update.dto';
import {
  AnimeNotFoundException,
  AnimesNotFoundException,
} from 'src/modules/animes/exceptions';
import { AnimeService } from 'src/modules/animes/service';

@ApiBearerAuth()
@ApiTags('Animes')
@Controller('animes')
@PermissionModule(Module.animes)
export class AnimesController {
  constructor(private readonly service: AnimeService) {}

  @SearchAnimesEndpoint()
  public async search(
    @Query() query: SearchAnimesQueryDto,
  ): Promise<Pageable<AnimeEntity>> {
    const response = await this.service.search(query);

    if (!response) {
      throw new AnimesNotFoundException();
    }

    return response;
  }

  @GetAnimeByIdEndpoint()
  public async getById(
    @Param() param: GetAnimeByIdParamDto,
  ): Promise<AnimeEntity> {
    return this.verifyAnimeById(param.id);
  }

  @CreateAnimeEndpoint()
  public async create(@Body() body: CreateAnimeBodyDto): Promise<AnimeEntity> {
    return this.service.create(body);
  }

  @UpdateAnimeEndpoint()
  public async update(
    @Param() param: UpdateAnimeByIdParamDto,
    @Body() body: UpdateAnimeBodyDto,
  ): Promise<AnimeEntity> {
    await this.verifyAnimeById(param.id);

    return this.service.update(param.id, body);
  }

  @DeleteAnimeEndpoint()
  public async delete(@Param() param: DeleteAnimeByIdParamDto): Promise<void> {
    await this.verifyAnimeById(param.id);

    await this.service.delete(param.id);
  }

  private async verifyAnimeById(id: string): Promise<AnimeEntity> {
    const anime = await this.service.getById(id);

    if (!anime) {
      throw new AnimeNotFoundException();
    }

    return anime;
  }
}
