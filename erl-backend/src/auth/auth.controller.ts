import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guards';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from 'src/dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService,
  )
  {}

  @Post('SignIn')
  async login(@Body() signInDto: SignInDto) {
    const user = await this.authservice.validateUser(signInDto);
    console.log(user,'my user')
    if (!user) {

        throw new HttpException('Invalid credentials',401);
    }

    // return user

    return this.authservice.login(user);

  }
@Get('status')
// @UseGuards(JwtAuthGuard)
status(@Req() req:Request){
  console.log('am using a guard on status')
  console.log(req.user,'where is muy user')
}

}
