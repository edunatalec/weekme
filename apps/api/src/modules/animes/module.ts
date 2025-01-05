import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { AnimeController } from 'src/modules/animes/controller';
import { AnimeService } from 'src/modules/animes/service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
