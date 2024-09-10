import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignInDto } from 'src/dto/signIn.dto';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
    status(req: Request): void;
}
