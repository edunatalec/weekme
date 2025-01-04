import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, PermissionEntity, ProtectedResource } from '@repo/core';
import { RequiredResource } from 'src/core/decorators/required-resource.decorator';
import {
  GetPermissionByIdEndpoint,
  SearchPermissionsEndpoint,
  UpdatePermissionEndpoint,
} from 'src/modules/permissions/decorators';
import { GetPermissionByIdParamDto } from 'src/modules/permissions/dtos/get-by-id';
import { SearchPermissionsQueryDto } from 'src/modules/permissions/dtos/search.dto';
import {
  UpdatePermissionBodyDto,
  UpdatePermissionByIdParamDto,
} from 'src/modules/permissions/dtos/update.dto';
import {
  PermissionNotFoundException,
  PermissionsNotFoundException,
} from 'src/modules/permissions/exceptions';
import { PermissionService } from 'src/modules/permissions/service';

@ApiBearerAuth()
@ApiTags('Permissões')
@Controller('permissions')
@RequiredResource(ProtectedResource.PERMISSIONS)
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @SearchPermissionsEndpoint()
  public async search(
    @Query() query: SearchPermissionsQueryDto,
  ): Promise<Pageable<PermissionEntity>> {
    const response = await this.service.search(query);

    if (!response) {
      throw new PermissionsNotFoundException();
    }

    return response;
  }

  @GetPermissionByIdEndpoint()
  public async getById(
    @Param() param: GetPermissionByIdParamDto,
  ): Promise<PermissionEntity> {
    return this.verifyPermissionById(param.id);
  }

  @UpdatePermissionEndpoint()
  public async update(
    @Param() param: UpdatePermissionByIdParamDto,
    @Body() body: UpdatePermissionBodyDto,
  ): Promise<PermissionEntity> {
    await this.verifyPermissionById(param.id);

    return this.service.update(param.id, body);
  }

  private async verifyPermissionById(id: string): Promise<PermissionEntity> {
    const permission = await this.service.getById(id);

    if (!permission) {
      throw new PermissionNotFoundException();
    }

    return permission;
  }
}
