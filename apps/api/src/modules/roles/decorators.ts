import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action.decorator';

export const SearchRolesEndpoint = () => {
  return applyDecorators(
    Get(),
    ResourceAction<ProtectedResource.ROLES>({ action: 'view' }),
  );
};

export const GetRoleByIdEndpoint = () => {
  return applyDecorators(
    Get(':id'),
    ResourceAction<ProtectedResource.ROLES>({ action: 'view' }),
  );
};

export const CreateRoleEndpoint = () => {
  return applyDecorators(
    Post(),
    ResourceAction<ProtectedResource.ROLES>({ action: 'create' }),
  );
};

export const UpdateRoleEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    ResourceAction<ProtectedResource.ROLES>({ action: 'update' }),
  );
};

export const DeleteRoleEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    ResourceAction<ProtectedResource.ROLES>({ action: 'delete' }),
  );
};
