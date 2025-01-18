import { Body, Param, Query } from '@nestjs/common';
import { AnimeEntity, Pageable } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data';
import {
  AnimeControllerDecorators,
  CreateAnimeEndpoint,
  DeleteAnimeEndpoint,
  GetAnimeByIdEndpoint,
  SearchAnimesEndpoint,
  UpdateAnimeEndpoint,
} from 'src/modules/animes/decorators';
import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create';
import { DeleteAnimeByIdParamDto } from 'src/modules/animes/dtos/delete';
import { GetAnimeByIdParamDto } from 'src/modules/animes/dtos/get-by-id';
import { SearchAnimesQueryDto } from 'src/modules/animes/dtos/search';
import {
  UpdateAnimeBodyDto,
  UpdateAnimeByIdParamDto,
} from 'src/modules/animes/dtos/update';
import {
  AnimeAlreadyRegisteredException,
  AnimeNotFoundException,
  AnimesNotFoundException,
} from 'src/modules/animes/exceptions';
import { AnimeService } from 'src/modules/animes/service';

@AnimeControllerDecorators()
export class AnimeController {
  constructor(private readonly service: AnimeService) {}

  @SearchAnimesEndpoint()
  public async search(
    @Query() query: SearchAnimesQueryDto,
  ): Promise<Pageable<AnimeEntity>> {
    const response = await this.service.search(query);

    if (response) return response;

    throw new AnimesNotFoundException();
  }

  @GetAnimeByIdEndpoint()
  public async getById(
    @CurrentData() anime: AnimeEntity | undefined,
    @Param() _: GetAnimeByIdParamDto,
  ): Promise<AnimeEntity> {
    return this.validate(anime);
  }

  @CreateAnimeEndpoint()
  public async create(@Body() body: CreateAnimeBodyDto): Promise<AnimeEntity> {
    const anime = await this.service.getByName(body.name);

    if (anime) throw new AnimeAlreadyRegisteredException();

    return this.service.create(body);
  }

  @UpdateAnimeEndpoint()
  public async update(
    @CurrentData() anime: AnimeEntity | undefined,
    @Param() _: UpdateAnimeByIdParamDto,
    @Body() body: UpdateAnimeBodyDto,
  ): Promise<AnimeEntity> {
    await this.validate(anime);

    return this.service.update(anime!.id, body);
  }

  @DeleteAnimeEndpoint()
  public async delete(
    @CurrentData() anime: AnimeEntity | undefined,
    @Param() _: DeleteAnimeByIdParamDto,
  ): Promise<void> {
    await this.validate(anime);

    await this.service.delete(anime!.id);
  }

  private async validate(anime: AnimeEntity | undefined): Promise<AnimeEntity> {
    if (anime) return anime;

    throw new AnimeNotFoundException();
  }
}
