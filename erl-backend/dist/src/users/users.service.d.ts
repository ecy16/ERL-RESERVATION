import { DataSource } from "typeorm";
import { AddUserDto } from "src/dto/add-user.dto";
import { User } from "src/entities/user.entity";
export declare class UsersService {
    private UserDataSource;
    constructor(UserDataSource: DataSource);
    addUser(addUserDto: AddUserDto): Promise<{
        username: string;
    }>;
    findByUsername(username: string): Promise<User | null>;
}
