import { applyDecorators, Get } from '@nestjs/common';
import { IsPublic } from 'src/core/decorators/is-public';

export const GetScheduleAnimesEndpoint = () => {
  return applyDecorators(IsPublic(), Get('animes'));
};
