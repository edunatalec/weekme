import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CrudAction, hasPermission, ProtectedResource } from '@repo/core';
import { RESOURCE_ACTION_KEY } from 'src/core/decorators/crud-action.decorator';
import { IS_PUBLIC_KEY } from 'src/core/decorators/is-public.decorator';
import { REQUIRED_RESOURCE_KEY } from 'src/core/decorators/required-resource.decorator';
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

    const action = getMetadata<CrudAction>({
      key: RESOURCE_ACTION_KEY,
      reflector: this.reflector,
      context,
    });

    const resource = getMetadata<ProtectedResource>({
      key: REQUIRED_RESOURCE_KEY,
      reflector: this.reflector,
      context,
    });

    if (!action || !resource) return true;

    return hasPermission({
      action,
      resource,
      user: request.user,
      data: id && { id },
    });
  }
}
