import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Schedule } from '@repo/core';
import { GetScheduleAnimesEndpoint } from 'src/modules/schedule/decorators';
import { ScheduleService } from 'src/modules/schedule/service';

@ApiTags('Calendário')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @GetScheduleAnimesEndpoint()
  public getAnimes(): Promise<Schedule[]> {
    return this.service.getAnimes();
  }
}
