export declare class User {
    UserID: number;
    FullName: string;
    username: string;
    EmailAddress: string;
    password: string;
    UserStatus: string;
    Department: string;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string;
    ModifiedOn: string;
    roles: string;
    constructor(users: Partial<User>);
}
