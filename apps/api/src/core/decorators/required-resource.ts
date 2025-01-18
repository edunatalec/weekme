import { SetMetadata } from '@nestjs/common';
import { ProtectedResource } from '@repo/core';

export const REQUIRED_RESOURCE_KEY = 'module';

export const RequiredResource = (resource: ProtectedResource) =>
  SetMetadata(REQUIRED_RESOURCE_KEY, resource);
