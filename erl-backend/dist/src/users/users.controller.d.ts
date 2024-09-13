import { UsersService } from './users.service';
import { AddUserDto } from '../dto/add-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    addNewUser(body: AddUserDto): Promise<{
        username: string;
    }>;
}
