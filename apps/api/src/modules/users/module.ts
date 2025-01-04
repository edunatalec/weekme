import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { UserController } from './controller';
import { UserService } from './service';
import { PaginationService } from 'src/core/services/pagination.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, PaginationService],
})
export class UserModule {}
