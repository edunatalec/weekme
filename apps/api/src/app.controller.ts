import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public ping() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
