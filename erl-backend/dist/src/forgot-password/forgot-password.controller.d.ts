import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
export declare class ForgotPasswordController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendResetLink(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    private generateResetToken;
}
