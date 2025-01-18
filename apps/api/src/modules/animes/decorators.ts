import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProtectedResource } from '@repo/core';

import { ResourceAction } from 'src/core/decorators/crud-action';
import { RequiredResource } from 'src/core/decorators/required-resource';

export const AnimeControllerDecorators = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Animes'),
    Controller('animes'),
    RequiredResource(ProtectedResource.ANIMES),
  );
};

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
