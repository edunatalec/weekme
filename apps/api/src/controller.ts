import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from '@repo/core';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { IsPublic } from 'src/core/decorators/is-public.decorator';

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
  @ApiBearerAuth()
  public me(@CurrentUser() user: UserEntity) {
    return user;
  }
}
