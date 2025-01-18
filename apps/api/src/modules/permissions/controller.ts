import { Body, Param, Query } from '@nestjs/common';
import { Pageable, PermissionEntity } from '@repo/core';
import { CurrentData } from 'src/core/decorators/current-data';
import {
  GetPermissionByIdEndpoint,
  PermissionControllerDecorators,
  SearchPermissionsEndpoint,
  UpdatePermissionEndpoint,
} from 'src/modules/permissions/decorators';
import { GetPermissionByIdParamDto } from 'src/modules/permissions/dtos/get-by-id';
import { SearchPermissionsQueryDto } from 'src/modules/permissions/dtos/search';
import {
  UpdatePermissionBodyDto,
  UpdatePermissionByIdParamDto,
} from 'src/modules/permissions/dtos/update';
import {
  PermissionNotFoundException,
  PermissionsNotFoundException,
} from 'src/modules/permissions/exceptions';
import { PermissionService } from 'src/modules/permissions/service';

@PermissionControllerDecorators()
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
    return this.validate(permission);
  }

  @UpdatePermissionEndpoint()
  public async update(
    @CurrentData() permission: PermissionEntity | undefined,
    @Param() _: UpdatePermissionByIdParamDto,
    @Body() body: UpdatePermissionBodyDto,
  ): Promise<PermissionEntity> {
    await this.validate(permission);

    return this.service.update(permission!.id, body);
  }

  private async validate(
    permission: PermissionEntity | undefined,
  ): Promise<PermissionEntity> {
    if (permission) return permission;

    throw new PermissionNotFoundException();
  }
}
