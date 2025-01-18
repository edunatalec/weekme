import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from 'src/core/database/module';
import { AuthGuard } from 'src/core/guards/auth/guard';
import { PermissionGuard } from 'src/core/guards/permission/guard';
import { AnimeModule } from 'src/modules/animes/module';
import { AuthModule } from 'src/modules/auth/module';
import { PermissionModule } from 'src/modules/permissions/module';
import { ProfileModule } from 'src/modules/profile/module';
import { ForgotPasswordModule } from 'src/modules/forgot-password/module';
import { RoleModule } from 'src/modules/roles/module';
import { ScheduleModule } from 'src/modules/schedule/module';
import { SeasonModule } from 'src/modules/seasons/module';
import { AppController } from './controller';
import { UserModule } from './modules/users/module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    AnimeModule,
    SeasonModule,
    ScheduleModule,
    ProfileModule,
    ForgotPasswordModule,
  ],
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
