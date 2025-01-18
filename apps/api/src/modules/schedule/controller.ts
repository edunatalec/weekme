import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetScheduleAnimesEndpoint } from 'src/modules/schedule/decorators';
import { ScheduleAnime } from 'src/modules/schedule/interfaces/schedule-anime';
import { ScheduleService } from 'src/modules/schedule/service';

@ApiTags('Calendário')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @GetScheduleAnimesEndpoint()
  public getAnimes(): Promise<ScheduleAnime[]> {
    return this.service.getAnimes();
  }
}
