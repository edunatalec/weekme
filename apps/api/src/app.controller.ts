import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/core/guards/current-user.decorator';

@Controller()
export class AppController {
  @Get('ping')
  public ping() {
    return {
      status: 'pong',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('me')
  public me(@CurrentUser() user) {
    return user;
  }
}
