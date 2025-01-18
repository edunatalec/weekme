import { applyDecorators, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action';
import { RequiredResource } from 'src/core/decorators/required-resource';

export const PermissionControllerDecorators = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Permissões'),
    Controller('permissions'),
    RequiredResource(ProtectedResource.PERMISSIONS),
  );
};

export const SearchPermissionsEndpoint = () => {
  return applyDecorators(
    Get(),
    ResourceAction<ProtectedResource.PERMISSIONS>({ action: 'view' }),
  );
};

export const GetPermissionByIdEndpoint = () => {
  return applyDecorators(
    Get(':id'),
    ResourceAction<ProtectedResource.PERMISSIONS>({ action: 'view' }),
  );
};

export const UpdatePermissionEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    ResourceAction<ProtectedResource.PERMISSIONS>({ action: 'update' }),
  );
};
