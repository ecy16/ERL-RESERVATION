import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTripServicesDto {
    @IsOptional()
    TripId: number;
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    ServiceCode: string;
    @IsOptional()
    TripCharge: string;
    @IsOptional()
    TripServiceStatus: string;
    @IsOptional()
    InvoiceNo: number;
    @IsOptional()
    InvoiceLineNo: number;
    @IsOptional()
    InvoiceDate: string;
    @IsOptional()
    ModifiedBy: string;
    @IsOptional()
    ModifiedOn: string;
}
