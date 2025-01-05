import { applyDecorators, Get, Patch } from '@nestjs/common';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action.decorator';

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
