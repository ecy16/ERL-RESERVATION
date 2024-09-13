import { IsEmail, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AddUserDto {
    @IsOptional()
    FullName: string;
    @IsString()
    username: string;
    @IsOptional()
    EmailAddress: string;
    @IsString()
    password: string;
    @IsOptional()
    UserStatus: string;
    @IsString()
    Department: string;
    @IsOptional()
    roles: string;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
}
