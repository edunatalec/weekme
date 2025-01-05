import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface GetMetadataProps {
  readonly key: string;
  readonly reflector: Reflector;
  readonly context: ExecutionContext;
}

export const getMetadata = <T = any>({
  key,
  reflector,
  context,
}: GetMetadataProps): T => {
  return reflector.getAllAndOverride<T>(key, [
    context.getHandler(),
    context.getClass(),
  ]);
};
