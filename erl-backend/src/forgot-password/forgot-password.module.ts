import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgot-password.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [ForgotPasswordController],
  providers:[MailService]
})
export class ForgotPasswordModule {}
