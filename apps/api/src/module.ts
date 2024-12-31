import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { DatabaseModule } from 'src/core/database/module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/module';
import { UserModule } from './modules/users/module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { PermissionGuard } from 'src/core/guards/permission.guard';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
