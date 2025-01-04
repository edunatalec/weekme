import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { RoleController } from 'src/modules/roles/controller';
import { RoleService } from 'src/modules/roles/service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
