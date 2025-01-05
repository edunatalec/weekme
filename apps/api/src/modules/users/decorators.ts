import { applyDecorators, Delete, Get, Patch } from '@nestjs/common';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action.decorator';

export const SearchUsersEndpoint = () => {
  return applyDecorators(
    Get(),
    ResourceAction<ProtectedResource.USERS>({ action: 'view' }),
  );
};

export const GetUserByIdEndpoint = () => {
  return applyDecorators(
    Get(':id'),
    ResourceAction<ProtectedResource.USERS>({ action: 'view' }),
  );
};

export const UpdateUserEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    ResourceAction<ProtectedResource.USERS>({ action: 'update' }),
  );
};

export const DeleteUserEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    ResourceAction<ProtectedResource.USERS>({ action: 'delete' }),
  );
};
