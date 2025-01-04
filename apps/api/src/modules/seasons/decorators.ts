import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import { Module } from '@repo/core';
import { Action } from 'src/core/decorators/action.decorator';

export const SearchSeasonsEndpoint = () => {
  return applyDecorators(Get(), Action<Module.seasons>({ action: 'view' }));
};

export const GetSeasonByIdEndpoint = () => {
  return applyDecorators(
    Get(':id'),
    Action<Module.seasons>({ action: 'view' }),
  );
};

export const CreateSeasonEndpoint = () => {
  return applyDecorators(Post(), Action<Module.seasons>({ action: 'create' }));
};

export const UpdateSeasonEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    Action<Module.seasons>({ action: 'update' }),
  );
};

export const DeleteSeasonEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    Action<Module.seasons>({ action: 'delete' }),
  );
};
