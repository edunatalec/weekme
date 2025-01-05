import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pageable, PermissionEntity, ProtectedResource } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data.decorator';
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

    if (response) return response;

    throw new PermissionsNotFoundException();
  }

  @GetPermissionByIdEndpoint()
  public async getById(
    @CurrentData() permission: PermissionEntity | undefined,
    @Param() _: GetPermissionByIdParamDto,
  ): Promise<PermissionEntity> {
    return this.verifyPermission(permission);
  }

  @UpdatePermissionEndpoint()
  public async update(
    @CurrentData() permission: PermissionEntity | undefined,
    @Param() _: UpdatePermissionByIdParamDto,
    @Body() body: UpdatePermissionBodyDto,
  ): Promise<PermissionEntity> {
    await this.verifyPermission(permission);

    return this.service.update(permission.id, body);
  }

  private async verifyPermission(
    permission: PermissionEntity | undefined,
  ): Promise<PermissionEntity> {
    if (permission) return permission;

    throw new PermissionNotFoundException();
  }
}
