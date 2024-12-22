import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/core/database/repositories/user.repository';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
