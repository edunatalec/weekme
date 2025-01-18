import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create';

import { PartialType } from '@nestjs/mapped-types';
import { IdParamDto } from 'src/core/dtos/id';

export class UpdateAnimeByIdParamDto extends IdParamDto {}

export class UpdateAnimeBodyDto extends PartialType(CreateAnimeBodyDto) {}
