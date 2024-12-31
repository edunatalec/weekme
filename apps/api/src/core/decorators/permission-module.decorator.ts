import { SetMetadata } from '@nestjs/common';
import { Module } from '@repo/core';

export const PERMISSION_MODULE_KEY = 'module';

export const PermissionModule = (module: Module) =>
  SetMetadata(PERMISSION_MODULE_KEY, module);
