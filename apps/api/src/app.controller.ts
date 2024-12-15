import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  public ping() {
    return {
      status: 'pong',
      timestamp: new Date().toISOString(),
    };
  }
}
