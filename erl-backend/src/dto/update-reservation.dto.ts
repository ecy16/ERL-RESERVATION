import { IsOptional, IsString } from 'class-validator';

export class UpdateReservationDto {
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
    ChargeType: string;
    @IsString()
    ChargeCurr: string;
    @IsString()
    @IsOptional()
    TotalAmount: number;
    @IsString()
    @IsOptional()
    TotalPaid: number;
    @IsString()
    ExchangeRate: number;
    @IsString()
    Source: string;
    @IsString()
    @IsOptional()
    SourceRefNo: string;
    @IsString()
    @IsOptional()
    ContractId: number;
    @IsString()
    @IsOptional()
    CreditCardNo: string;
    @IsString()
    @IsOptional()
    CreditCardName: string;
    @IsString()
    @IsOptional()
    CreditCardExpiryDate: string;
    @IsString()
    @IsOptional()
    CreditCardPreAuthorizationNo: string;
    @IsString()
    @IsOptional()
    CreditCardType: string;
    @IsString()
    @IsOptional()
    CreditCardPreAuthAmount: number;
    @IsString()
    @IsOptional()
    CreditCardPreAuthStatus: string;
    @IsString()
    ModifiedBy: string;
    @IsString()
    ModifiedOn: string;
}
