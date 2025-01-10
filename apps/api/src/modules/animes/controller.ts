import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnimeEntity, Pageable, ProtectedResource } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data.decorator';
import { RequiredResource } from 'src/core/decorators/required-resource.decorator';
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
  AnimeAlreadyRegisteredException,
  AnimeNotFoundException,
  AnimesNotFoundException,
} from 'src/modules/animes/exceptions';
import { AnimeService } from 'src/modules/animes/service';

@ApiBearerAuth()
@ApiTags('Animes')
@Controller('animes')
@RequiredResource(ProtectedResource.ANIMES)
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
    return this.verifyAnime(anime);
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
    await this.verifyAnime(anime);

    return this.service.update(anime.id, body);
  }

  @DeleteAnimeEndpoint()
  public async delete(
    @CurrentData() anime: AnimeEntity | undefined,
    @Param() _: DeleteAnimeByIdParamDto,
  ): Promise<void> {
    await this.verifyAnime(anime);

    await this.service.delete(anime.id);
  }

  private async verifyAnime(
    anime: AnimeEntity | undefined,
  ): Promise<AnimeEntity> {
    if (anime) return anime;

    throw new AnimeNotFoundException();
  }
}
