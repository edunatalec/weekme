import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class RoleModule {}
