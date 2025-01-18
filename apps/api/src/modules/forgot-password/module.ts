import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/module';
import { MailerService } from 'src/core/services/mailer/service';
import { ForgotPasswordController } from 'src/modules/forgot-password/controller';
import { ForgotPasswordService } from 'src/modules/forgot-password/service';

@Module({
  imports: [DatabaseModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, MailerService],
})
export class ForgotPasswordModule {}
