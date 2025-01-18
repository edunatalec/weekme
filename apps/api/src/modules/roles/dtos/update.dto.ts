import { PartialType } from '@nestjs/mapped-types';
import { IdParamDto } from 'src/core/dtos/id';
import { CreateRoleBodyDto } from 'src/modules/roles/dtos/create';

export class UpdateRoleByIdParamDto extends IdParamDto {}

export class UpdateRoleBodyDto extends PartialType(CreateRoleBodyDto) {}
