import { CreateAnimeBodyDto } from 'src/modules/animes/dtos/create.dto';

import { PartialType } from '@nestjs/mapped-types';
import { IdParamDto } from 'src/core/dtos/id.dto';

export class UpdateAnimeByIdParamDto extends IdParamDto {}

export class UpdateAnimeBodyDto extends PartialType(CreateAnimeBodyDto) {}
