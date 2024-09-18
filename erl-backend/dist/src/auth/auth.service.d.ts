import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from 'src/dto/signIn.dto';
export declare class AuthService {
    private jwtservice;
    private usersService;
    constructor(jwtservice: JwtService, usersService: UsersService);
    validateUser({ username, password }: SignInDto): Promise<{
        UserID: number;
        FullName: string;
        username: string;
        EmailAddress: string;
        UserStatus: string;
        Department: string;
        CreatedBy: string;
        CreatedOn: string;
        ModifiedBy: string;
        ModifiedOn: string;
        roles: string;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
