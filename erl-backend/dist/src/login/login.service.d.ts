import { SignInDto } from '../dto/signIn.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
export declare class LoginService {
    create(signInDto: SignInDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLoginDto: UpdateLoginDto): string;
    remove(id: number): string;
}
