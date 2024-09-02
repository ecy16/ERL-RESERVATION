import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReservationDto {
    @IsOptional()
    BookingNo: string;
    @IsOptional()
    BookingDate: string;
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
    CompanyCode: string;
    @IsOptional()
    PayeeCompanyName: string;
    @IsOptional()
    Remarks: string;
    @IsOptional()
    Source: string;
    @IsOptional()
    SourceRefNo: string;
    @IsOptional()
    ContractId: number;
    @IsOptional()
    CreditCardPreAuthStatus: string;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
    @IsOptional()
    TotalAmount: string;
    @IsOptional()
    TotalPaid: string;
    @IsOptional()
    ExchangeRate: string;
    @IsOptional()
    companyName: string;
    @IsOptional()
    ContractNo: string;
    
}
