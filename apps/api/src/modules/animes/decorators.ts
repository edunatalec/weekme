import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import { Module } from '@repo/core';
import { Action } from 'src/core/decorators/action.decorator';

export const SearchAnimesEndpoint = () => {
  return applyDecorators(Get(), Action<Module.animes>({ action: 'view' }));
};

export const GetAnimeByIdEndpoint = () => {
  return applyDecorators(Get(':id'), Action<Module.animes>({ action: 'view' }));
};

export const CreateAnimeEndpoint = () => {
  return applyDecorators(Post(), Action<Module.animes>({ action: 'create' }));
};

export const UpdateAnimeEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    Action<Module.animes>({ action: 'update' }),
  );
};

export const DeleteAnimeEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    Action<Module.animes>({ action: 'delete' }),
  );
};
