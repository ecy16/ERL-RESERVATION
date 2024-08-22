import { IsEmail, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class SearchReservationsDto {
    @IsOptional()
    BookingNo: string;
    @IsOptional()
    BookingCategory: string;
    @IsOptional()
    BookingType: string;
    @IsOptional()
    Branch: string;
    @IsOptional()
    BookingStatus: string;
    @IsOptional()
    BookingFor: string;
    @IsOptional()
    vehicleMake: string;
    @IsString()
    RegNo: string;
    @IsOptional()
    BookingDate: string;
    @IsOptional()
    fromDate: string;
    @IsOptional()
    toDate: string;
  
}