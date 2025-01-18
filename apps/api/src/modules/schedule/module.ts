import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { ScheduleController } from 'src/modules/schedule/controller';
import { ScheduleService } from 'src/modules/schedule/service';

@Module({
  imports: [DatabaseModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
