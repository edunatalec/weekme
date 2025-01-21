import { applyDecorators } from '@nestjs/common';
import { IsString, MinLength, MaxLength } from 'class-validator';

export const IsPassword = () => {
  return applyDecorators(IsString(), MinLength(8), MaxLength(20));
};
