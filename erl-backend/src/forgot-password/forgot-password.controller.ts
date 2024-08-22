import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto } from '../dto/forgot-Password.dto'
import * as crypto from 'crypto';

@Controller('forgot-password')

export class ForgotPasswordController {

    constructor(private readonly mailService: MailService) { }

    @Post()
    async sendResetLink(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const resetToken = this.generateResetToken();

        await this.mailService.sendResetLink(forgotPasswordDto.EmailAddress, resetToken);
        console.log('emailed', resetToken)
        return { message: 'Password reset link sent successfully' };
    }

    private generateResetToken(): string {
        return crypto.randomBytes(20).toString('hex');
    }
}
