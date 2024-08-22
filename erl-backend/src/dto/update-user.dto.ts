import {
    IsEmail,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    FullName: string;
    @IsString()
    @IsOptional()
    UserName: string;
    @IsEmail()
    @IsOptional()
    EmailAddress: string;
    @IsString()
    @IsOptional()
    Password: string;
    @IsBoolean()
    @IsOptional()
    UserStatus: boolean;
    @IsString()
    @IsOptional()
    Department: string;
    @IsNumber()
    @IsOptional()
    Roles: number;
    @IsString()
    ModifiedBy: string;
    @IsString()
    ModifiedOn: string;
}
