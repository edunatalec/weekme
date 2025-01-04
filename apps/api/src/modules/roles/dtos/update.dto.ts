import { PartialType } from '@nestjs/mapped-types';
import { IdParamDto } from 'src/core/dtos/id.dto';
import { CreateRoleBodyDto } from 'src/modules/roles/dtos/create.dto';

export class UpdateRoleByIdParamDto extends IdParamDto {}

export class UpdateRoleBodyDto extends PartialType(CreateRoleBodyDto) {}
