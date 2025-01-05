import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action.decorator';

export const SearchAnimesEndpoint = () => {
  return applyDecorators(
    Get(),
    ResourceAction<ProtectedResource.ANIMES>({ action: 'view' }),
  );
};

export const GetAnimeByIdEndpoint = () => {
  return applyDecorators(
    Get(':id'),
    ResourceAction<ProtectedResource.ANIMES>({ action: 'view' }),
  );
};

export const CreateAnimeEndpoint = () => {
  return applyDecorators(
    Post(),
    ResourceAction<ProtectedResource.ANIMES>({ action: 'create' }),
  );
};

export const UpdateAnimeEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    ResourceAction<ProtectedResource.ANIMES>({ action: 'update' }),
  );
};

export const DeleteAnimeEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    ResourceAction<ProtectedResource.ANIMES>({ action: 'delete' }),
  );
};
