import {IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';


export class AddDriversDto {
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    DriverFirstName: string;
    @IsOptional()
    DriverMiddleName: string;
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
    Qualification: string;
    @IsOptional()
    Language1: string;
    @IsOptional()
    Language2: string;
    @IsOptional()
    Language3: string;
    @IsOptional()
    DriverPhoto: string;
    @IsOptional()
    DriverClass: string;
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
    @IsOptional()
    Status: string;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
    @IsOptional()
    NextOfKinContactNo: string;
 
}
