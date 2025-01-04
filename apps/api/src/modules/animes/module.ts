import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { PaginationService } from 'src/core/services/pagination.service';
import { AnimesController as AnimeController } from 'src/modules/animes/controller';
import { AnimeService } from 'src/modules/animes/service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimeController],
  providers: [AnimeService, PaginationService],
})
export class AnimeModule {}
