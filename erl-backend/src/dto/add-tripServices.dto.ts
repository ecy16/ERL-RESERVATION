import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTripServicesDto {
    //@IsNumber()
    @IsOptional()
    TripId: number;
    //@IsNumber()
    @IsOptional()
    ReservationId: number;
    //@IsString()
    // @IsOptional()
    // ServiceCode: string;

    @IsOptional()
    serviceName: string;
   
    //@IsNumber()
    @IsOptional()
    TripCharge: string;
    // @IsString()
    @IsOptional()
    TripServiceStatus: string;
    // @IsNumber()
    @IsOptional()
    InvoiceNo: number;
    //@IsNumber()
    @IsOptional()
    InvoiceLineNo: number;
    // @IsString()
    @IsOptional()
    InvoiceDate: string;
    // @IsString()
    @IsOptional()
    CreatedBy: string;
    // @IsString()
    @IsOptional()
    CreatedOn: string;
    @IsOptional()
    serviceCode: string;
    @IsOptional()
    quantity: string;
    @IsOptional()
    tripType: string;
    @IsOptional()
    TripNo: string;
    @IsOptional()
    Stocklink: string;
}
