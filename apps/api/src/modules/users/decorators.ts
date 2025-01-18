import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action';
import { RequiredResource } from 'src/core/decorators/required-resource';

export const UserControllerDecorators = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Usuários'),
    Controller('users'),
    RequiredResource(ProtectedResource.USERS),
  );
};

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
