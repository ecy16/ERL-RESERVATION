import { IsEmail, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class VehicleMovementDto {
    @IsOptional()
    TripId: number;
    @IsOptional()
    tripNumber: number;
    @IsOptional()
    MileageCap: number;
    @IsOptional()
    MileageIN: number;
    @IsOptional()
    MileageOUT: number;
    @IsOptional()
    FuelIN: number;
    @IsOptional()
    FuelOUT: number;
    @IsOptional()
    BookingStatus: string;
    @IsOptional()
    BookingFor: string;
    @IsOptional()
    TripStatus: string;
    @IsOptional()
    vehicleMake: string;
    @IsOptional()
    FromDateTime: Date;
    @IsOptional()
    ToDateTime: Date;
    @IsOptional()
    Transaction: string;

}