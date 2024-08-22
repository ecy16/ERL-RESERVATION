import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContractDto extends PartialType(CreateContractDto) {

    @IsOptional()
    ContractId: number;
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

}
