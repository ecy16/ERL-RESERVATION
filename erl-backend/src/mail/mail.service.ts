// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendResetLink(EmailAddress: string, resetToken: string) {
    // Configure nodemailer to send email
    const transporter = nodemailer.createTransport({
      // Configure your email provider (e.g., SMTP or SendGrid)
    });

    // Send email
    await transporter.sendMail({
      from: 'your@example.com',
      to: EmailAddress,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://example.com/reset-password?token=${resetToken}`,
    });
  }
}
