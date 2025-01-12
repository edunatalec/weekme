import { applyDecorators } from '@nestjs/common';
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export const IsUUIDArray = () => {
  return applyDecorators(
    IsArray(),
    ArrayNotEmpty(),
    IsUUID('4', { each: true }),
  );
};
