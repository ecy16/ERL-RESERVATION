import { IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateContractDto {
    // @IsOptional()
    // ContractId: number;
    @IsString()
    @IsOptional()
    ContractNo: string;
    @IsString()
    @IsOptional()
    companyName: string;
    @IsString()
    @IsOptional()
    CompanyCode: string;
    @IsString()
    @IsOptional()
    status: string;
    @IsString()
    @IsOptional()
    StartDate: string;
    @IsString()
    @IsOptional()
    EndDate: string;
    @IsString()
    @IsOptional()
    BillingDay: string;
    @IsString()
    @IsOptional()
    ContractIdTemp: string;
    @IsString()
    @IsOptional()
    image: string;

}
