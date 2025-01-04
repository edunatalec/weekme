import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { SeasonController } from 'src/modules/seasons/controller';
import { SeasonService } from 'src/modules/seasons/service';

@Module({
  imports: [DatabaseModule],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
