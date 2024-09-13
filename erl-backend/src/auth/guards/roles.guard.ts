
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector ,private usersService:UsersService) {}


 async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log('roles',roles)
    const request = context.switchToHttp().getRequest();



    if (request?.user){
const {username} = request.user;
const user = await this.usersService.findByUsername(username)
// console.log('these are my user roles:', user.roles);
return roles.includes(user.roles )
    }

    return false
   
  }
}
