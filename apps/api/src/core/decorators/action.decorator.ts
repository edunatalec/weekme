import { SetMetadata } from '@nestjs/common';
import { TypedModules } from '@repo/core';

export const ACTION_KEY = 'action';

interface ActionProps<Module extends keyof TypedModules> {
  action: TypedModules[Module]['action'];
}

export const Action = <Module extends keyof TypedModules>({
  action,
}: ActionProps<Module>) => SetMetadata(ACTION_KEY, action);
