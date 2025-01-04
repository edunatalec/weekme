import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, ProtectedResource, RoleEntity } from '@repo/core';
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

    if (!response) {
      throw new RolesNotFoundException();
    }

    return response;
  }

  @GetRoleByIdEndpoint()
  public async getById(
    @Param() param: GetRoleByIdParamDto,
  ): Promise<RoleEntity> {
    return this.verifyRoleById(param.id);
  }

  @CreateRoleEndpoint()
  public async create(@Body() body: CreateRoleBodyDto): Promise<RoleEntity> {
    return this.service.create(body);
  }

  @UpdateRoleEndpoint()
  public async update(
    @Param() param: UpdateRoleByIdParamDto,
    @Body() body: UpdateRoleBodyDto,
  ): Promise<RoleEntity> {
    await this.verifyRoleById(param.id);

    return this.service.update(param.id, body);
  }

  @DeleteRoleEndpoint()
  public async delete(@Param() param: DeleteRoleByIdParamDto): Promise<void> {
    await this.verifyRoleById(param.id);

    await this.service.delete(param.id);
  }

  private async verifyRoleById(id: string): Promise<RoleEntity> {
    const role = await this.service.getById(id);

    if (!role) {
      throw new RoleNotFoundException();
    }

    return role;
  }
}
