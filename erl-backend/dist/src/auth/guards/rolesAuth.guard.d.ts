import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guards';
import { RolesGuard } from './roles.guard';
import { Observable } from 'rxjs/internal/Observable';
export declare class RolesAuthGuard implements CanActivate {
    private jwtAuthGuard;
    private rolesGuard;
    constructor(jwtAuthGuard: JwtAuthGuard, rolesGuard: RolesGuard);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
