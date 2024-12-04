import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
