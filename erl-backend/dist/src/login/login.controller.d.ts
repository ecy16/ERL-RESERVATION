import { LoginService } from './login.service';
import { SignInDto } from '../dto/signIn.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    create(signInDto: SignInDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLoginDto: UpdateLoginDto): string;
    remove(id: string): string;
}
