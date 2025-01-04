import { PartialType } from '@nestjs/mapped-types';
import { IdParamDto } from 'src/core/dtos/id.dto';
import { CreateSeasonBodyDto } from 'src/modules/seasons/dtos/create.dto';

export class UpdateSeasonByIdParamDto extends IdParamDto {}

export class UpdateSeasonBodyDto extends PartialType(CreateSeasonBodyDto) {}
