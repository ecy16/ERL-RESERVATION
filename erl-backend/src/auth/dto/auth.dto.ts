import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @ApiProperty()
  UserName: string;
  @ApiProperty()
  @IsNotEmpty()
  Password: string;
  @ApiProperty()
  @IsNotEmpty()
  Roles: string;
}
