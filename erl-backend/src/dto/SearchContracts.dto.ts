import { IsEmail, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class SearchContractsDto {
    @IsOptional()
    ContractNo: string;
    @IsOptional()
    companyName: string;
    @IsOptional()
    Name: string;
    @IsOptional()
    status: string;
    @IsOptional()
    StartDate: string;
    @IsOptional()
    EndDate: string;
    @IsOptional()
    BillingDay: string;

}