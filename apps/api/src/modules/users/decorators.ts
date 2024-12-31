import { applyDecorators, Delete, Get, Patch } from '@nestjs/common';
import { Module } from '@repo/core';
import { Action } from 'src/core/decorators/action.decorator';

export const SearchUsersEndpoint = () => {
  return applyDecorators(Get(), Action<Module.users>({ action: 'view' }));
};

export const GetUserByIdEndpoint = () => {
  return applyDecorators(Get(':id'), Action<Module.users>({ action: 'view' }));
};

export const UpdateUserEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    Action<Module.users>({ action: 'update' }),
  );
};

export const DeleteUserEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    Action<Module.users>({ action: 'delete' }),
  );
};
