import { IsOptional } from 'class-validator';

export class UpdateSelfDriversDto {
    @IsOptional()
    ReservationId: number;
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
    NextofKinContactNo: string;
    @IsOptional()
    Source: string;
    @IsOptional()
    SourceRefNo: string;
    @IsOptional()
    Extras: string;
    @IsOptional()
    BookingRemarks: string;
    @IsOptional()
    ModifiedBy: string;
    @IsOptional()
    ModifiedOn: string;
}
