import { Controller, Get } from '@nestjs/common';
import { UserEntity } from '@repo/core';
import { IsPublic } from 'src/core/decorators/is-public.decorator';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';

@Controller()
export class AppController {
  @Get('ping')
  @IsPublic()
  public ping() {
    return {
      status: 'pong',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('me')
  public me(@CurrentUser() user: UserEntity) {
    return user;
  }
}
