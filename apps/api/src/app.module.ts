import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from 'src/core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
