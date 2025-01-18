import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { ProfileController } from 'src/modules/profile/controller';
import { ProfileService } from 'src/modules/profile/service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
