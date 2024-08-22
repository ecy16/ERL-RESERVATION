import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReservationDto {
    @IsOptional()
    BookingNo: string;
    @IsString()
    BookingDate: string;
    @IsString()
    BookingCategory: string;
    @IsString()
    BookingType: string;
    @IsString()
    Branch: string;
    @IsString()
    BookingStatus: string;
    @IsString()
    BookingFor: string;
    @IsString()
    @IsOptional()
    CompanyCode: string;
    @IsString()
    @IsOptional()
    PayeeCompanyName: string;
    @IsString()
    @IsOptional()
    Remarks: string;
    @IsString()
    @IsOptional()
    Source: string;
    @IsString()
    @IsOptional()
    SourceRefNo: string;
    // @IsNumber()
    @IsOptional()
    ContractId: number;

    @IsString()
    @IsOptional()
    CreditCardPreAuthStatus: string;
    @IsString()
    @IsOptional()
    CreatedBy: string;
    @IsString()
    @IsOptional()
    CreatedOn: string;
    @IsString()
    @IsOptional()
    TotalAmount: string;
    @IsString()
    @IsOptional()
    TotalPaid: string;
    @IsString()
    @IsOptional()
    ExchangeRate: string;
    @IsString()
    @IsOptional()
    companyName: string;
    @IsString()
    @IsOptional()
    ContractNo: string;
    
}
