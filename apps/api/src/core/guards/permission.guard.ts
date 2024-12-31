import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Action, hasPermission, Module } from '@repo/core';
import { ACTION_KEY } from 'src/core/decorators/action.decorator';
import { IS_PUBLIC_KEY } from 'src/core/decorators/is-public.decorator';
import { PERMISSION_MODULE_KEY } from 'src/core/decorators/permission-module.decorator';
import { getMetadata } from 'src/core/utils/metadata';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = getMetadata<boolean>({
      key: IS_PUBLIC_KEY,
      reflector: this.reflector,
      context,
    });

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    const action = getMetadata<Action>({
      key: ACTION_KEY,
      reflector: this.reflector,
      context,
    });

    const module = getMetadata<Module>({
      key: PERMISSION_MODULE_KEY,
      reflector: this.reflector,
      context,
    });

    if (!action || !module) return true;

    return hasPermission({
      action,
      module,
      user: request.user,
      data: id && { id },
    });
  }
}
