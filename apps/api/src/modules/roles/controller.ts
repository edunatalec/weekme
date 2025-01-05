import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, ProtectedResource, RoleEntity } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data.decorator';
import { RequiredResource } from 'src/core/decorators/required-resource.decorator';
import {
  CreateRoleEndpoint,
  DeleteRoleEndpoint,
  GetRoleByIdEndpoint,
  SearchRolesEndpoint,
  UpdateRoleEndpoint,
} from 'src/modules/roles/decorators';
import { CreateRoleBodyDto } from 'src/modules/roles/dtos/create.dto';
import { DeleteRoleByIdParamDto } from 'src/modules/roles/dtos/delete.dto';
import { GetRoleByIdParamDto } from 'src/modules/roles/dtos/get-by-id.dto';
import { SearchRolesQueryDto } from 'src/modules/roles/dtos/search.dto';
import {
  UpdateRoleBodyDto,
  UpdateRoleByIdParamDto,
} from 'src/modules/roles/dtos/update.dto';
import {
  RoleNotFoundException,
  RolesNotFoundException,
} from 'src/modules/roles/exceptions';
import { RoleService } from 'src/modules/roles/service';

@ApiBearerAuth()
@ApiTags('Cargos')
@Controller('roles')
@RequiredResource(ProtectedResource.ROLES)
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @SearchRolesEndpoint()
  public async search(
    @Query() query: SearchRolesQueryDto,
  ): Promise<Pageable<RoleEntity>> {
    const response = await this.service.search(query);

    if (response) return response;

    throw new RolesNotFoundException();
  }

  @GetRoleByIdEndpoint()
  public async getById(
    @CurrentData() role: RoleEntity | undefined,
    @Param() _: GetRoleByIdParamDto,
  ): Promise<RoleEntity> {
    return this.verifyRole(role);
  }

  @CreateRoleEndpoint()
  public async create(@Body() body: CreateRoleBodyDto): Promise<RoleEntity> {
    return this.service.create(body);
  }

  @UpdateRoleEndpoint()
  public async update(
    @CurrentData() role: RoleEntity | undefined,
    @Param() _: UpdateRoleByIdParamDto,
    @Body() body: UpdateRoleBodyDto,
  ): Promise<RoleEntity> {
    await this.verifyRole(role);

    return this.service.update(role.id, body);
  }

  @DeleteRoleEndpoint()
  public async delete(
    @CurrentData() role: RoleEntity | undefined,
    @Param() _: DeleteRoleByIdParamDto,
  ): Promise<void> {
    await this.verifyRole(role);

    await this.service.delete(role.id);
  }

  private async verifyRole(role: RoleEntity | undefined): Promise<RoleEntity> {
    if (role) return role;

    throw new RoleNotFoundException();
  }
}
