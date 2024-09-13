export declare class MailService {
    sendResetLink(EmailAddress: string, resetToken: string): Promise<void>;
}
