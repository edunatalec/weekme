import { SetMetadata } from '@nestjs/common';
import { ResourceMap } from '@repo/core';

export const RESOURCE_ACTION_KEY = 'resourceAction';

interface Args<Resource extends keyof ResourceMap> {
  action: ResourceMap[Resource]['action'];
}

export const ResourceAction = <Resource extends keyof ResourceMap>({
  action,
}: Args<Resource>) => SetMetadata(RESOURCE_ACTION_KEY, action);
