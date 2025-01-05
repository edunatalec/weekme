import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { UserController } from './controller';
import { UserService } from './service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
