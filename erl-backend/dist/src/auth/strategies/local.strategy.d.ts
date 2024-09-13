import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<{
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
}
export {};
