import { Controller, Get } from '@nestjs/common';
import { IsPublic } from 'src/core/decorators/is-public';

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
}
