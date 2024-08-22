import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    Query,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AddUserDto } from '../dto/add-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User} from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }


    @Post('/add')
     addNewUser(@Body(ValidationPipe) body: AddUserDto) {
        return this.usersService.addUser(body)
    }

    // @Get('allUsers')
    // getAllUsers() {
    //     return this.usersService.fetchAllUsers();
    // }


    // @Get('/one')
    // findUser(@Query('UserName') UserName: string) {
    //     return this.usersService.findUser(UserName);
    // }






}
