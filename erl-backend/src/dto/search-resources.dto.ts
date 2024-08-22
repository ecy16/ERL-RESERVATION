import { IsEmail, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class SearchResourcesDto {
    @IsOptional()
    BookingNo: string;
    @IsOptional()
    BookingCategory: string;
    @IsOptional()
    BookingType: string;
    @IsOptional()
    ReservationId: string;
    @IsOptional()
    Branch: string;
    @IsOptional()
    BookingStatus: string;
    @IsOptional()
    BookingFor: string;
    @IsOptional()
    TripStatus: string;
    @IsOptional()
    vehicleMake: string;
     @IsOptional()
     FromDateTime: string;
    @IsOptional()
    ToDateTime: string;
  
}