import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/core/guards/current-user.decorator';

@Controller()
export class AppController {
  @Get()
  public ping() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('me')
  public me(@CurrentUser() user) {
    return user;
  }
}
