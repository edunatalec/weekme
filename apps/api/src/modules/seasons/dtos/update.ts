import { PartialType } from '@nestjs/mapped-types';
import { IdParamDto } from 'src/core/dtos/id';
import { CreateSeasonBodyDto } from 'src/modules/seasons/dtos/create';

export class UpdateSeasonByIdParamDto extends IdParamDto {}

export class UpdateSeasonBodyDto extends PartialType(CreateSeasonBodyDto) {}
