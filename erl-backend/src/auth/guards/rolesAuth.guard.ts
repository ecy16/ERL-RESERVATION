import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtAuthGuard } from './jwt.guards';

import { RolesGuard } from './roles.guard';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    @Inject(JwtAuthGuard) private jwtAuthGuard: JwtAuthGuard,
    private rolesGuard: RolesGuard,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return true
  //   const jwtGuardResult = this.jwtAuthGuard.canActivate(context);
  //   if (jwtGuardResult instanceof Promise) {
      
  //     return jwtGuardResult.then(() => this.rolesGuard.canActivate(context));
  //   } else {
  //     return this.rolesGuard.canActivate(context);
  //   }
  // }
}
}
