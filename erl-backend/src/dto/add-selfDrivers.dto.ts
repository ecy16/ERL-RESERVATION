import { IsOptional } from 'class-validator';

export class AddSelfDriversDto {
    @IsOptional()
    BookingDriverId: number;
    @IsOptional()
    BookingId: number;
    @IsOptional()
    DriverFirstName: string;
    @IsOptional()
    DriverLastName: string;
    @IsOptional()
    DriverDOB: Date;
    @IsOptional()
    DriverLicenseNo: string;
    @IsOptional()
    DriverLicenseIssue: string;
    @IsOptional()
    DriverLicenseExpiry: string;
    @IsOptional()
    Nationality: string;
    @IsOptional()
    IDPP: string;
    @IsOptional()
    IDPPExpiry: string;
    @IsOptional()
    CountryOfIssue: string;
    @IsOptional()
    CountryOfResidence: string;
    @IsOptional()
    AddressLine1: string;
    @IsOptional()
    AddressLine2: string;
    @IsOptional()
    AddressLine3: string;
    @IsOptional()
    ContactNo: string;
    @IsOptional()
    Email: string;
    @IsOptional()
    NextOfKinName: string;
    @IsOptional()
    NextOfKinContactNo: string;
    @IsOptional()
    Source: string;
    @IsOptional()
    SourceRefNo: string;
    @IsOptional()
    Extras: string;
    @IsOptional()
    BookingRemarks: string;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
    @IsOptional()
    ReservationId: number;
}
