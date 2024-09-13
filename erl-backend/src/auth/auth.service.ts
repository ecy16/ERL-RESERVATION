import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
// import { roles } from 'src/user.roles';
import { Role } from 'src/role.enum';
import { SignInDto } from 'src/dto/signIn.dto';


@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    private usersService: UsersService,
  ) {}



  async validateUser({ username, password }:SignInDto) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
    }
    return null;
}

async login(user: any) {
  const payload = { username: user.username, sub: user.password };
  return {
      access_token: this.jwtservice.sign(payload),
  };
}

//   async validateUser({ userName, password,roles }: AuthDTO) {
//     const users = this.userService.findUser(username, password,roles);
//     const finduser = (await users).find((user) => user.username === username);

//     if (!finduser) return null;

//     if (password === finduser.password) {
//       const { password, ...user } = finduser;
//       return this.jwtService.sign(user);
//     }
//   }
  

//   async signIn(UserName: string, Password: string,roles:string): Promise<any> {
//     const user = await this.usersService.findUser(UserName);
//     console.log('finding user', user);
  
//     if (!user) {
//         console.log('User not found');
//         throw new UnauthorizedException('Invalid username or password');
//     }
  
//     const isPasswordValid = await bcrypt.compare(Password, user.Password);
//     if (!isPasswordValid) {
//         console.log('Invalid password for user', user);
//         throw new UnauthorizedException('Invalid username or password');
//     }
  
//     const { Password: pwd, ...result } = user;
//     const payload = { sub: user.UserID,
//       username: user.UserName,
//       roles: '' };
//     const accessToken = this.jwtService.sign(payload);
  
//     console.log('Successful sign iIIIn', Role);
//     return {
//         access_token: accessToken,
//     };
//   }
// async sendPasswordResetEmail(EmailAddress: string) {
//     // Implement logic to generate and send password reset email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'your-email@gmail.com',
//         pass: 'your-password'
//       }
//     });

//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: EmailAddress,
//       subject: 'Password Reset',
//       text: 'Please click the link to reset your password'
//     };

//     await transporter.sendMail(mailOptions);
//   }


}
