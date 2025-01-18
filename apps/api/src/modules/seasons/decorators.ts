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

export const SeasonControllerDecorators = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiTags('Temporadas'),
    Controller('seasons'),
    RequiredResource(ProtectedResource.SEASONS),
  );
};

export const SearchSeasonsEndpoint = () => {
  return applyDecorators(
    Get(),
    ResourceAction<ProtectedResource.SEASONS>({ action: 'view' }),
  );
};

export const GetSeasonByIdEndpoint = () => {
  return applyDecorators(
    Get(':id'),
    ResourceAction<ProtectedResource.SEASONS>({ action: 'view' }),
  );
};

export const CreateSeasonEndpoint = () => {
  return applyDecorators(
    Post(),
    ResourceAction<ProtectedResource.SEASONS>({ action: 'create' }),
  );
};

export const UpdateSeasonEndpoint = () => {
  return applyDecorators(
    Patch(':id'),
    ResourceAction<ProtectedResource.SEASONS>({ action: 'update' }),
  );
};

export const DeleteSeasonEndpoint = () => {
  return applyDecorators(
    Delete(':id'),
    ResourceAction<ProtectedResource.SEASONS>({ action: 'delete' }),
  );
};
