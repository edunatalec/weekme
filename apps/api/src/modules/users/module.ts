import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { UserController } from './controller';
import { UserService } from './service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
