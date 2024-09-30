import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTripServicesDto {
    @IsOptional()
    TripId: number;
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    ServiceId: number;
    @IsOptional()
    serviceName: string;
    @IsOptional()
    serviceCode: string;
    @IsOptional()
    quantity: string;
    @IsOptional()
    Stocklink: string;
    @IsOptional()
    TripCharge: string;
    @IsOptional()
    tripNumber: number;
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
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
}
