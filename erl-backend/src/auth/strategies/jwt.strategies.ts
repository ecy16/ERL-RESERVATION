import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'cpl@2024',
    });
  }
//   validate(payload: any) {
// console.log('INSIDE JWT STRATEGY VALIDATE')
// console.log(payload)
// return payload;

async validate(payload: any) {
  const user = await this.usersService.findByUsername(payload.username);
  if (!user) {
    throw new UnauthorizedException();
  }
  console.log(user,'my extracted user')
  return user;
}
  
}
