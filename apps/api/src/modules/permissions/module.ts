import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { PermissionController } from 'src/modules/permissions/controller';
import { PermissionService } from 'src/modules/permissions/service';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
