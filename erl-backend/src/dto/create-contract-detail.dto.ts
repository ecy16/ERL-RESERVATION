import { IsNumber, IsOptional, IsString } from 'class-validator';
import { interval } from 'rxjs';

export class CreateContractDetailDto {
    @IsOptional()
    ContractDetailsId: number;
    @IsOptional()
    ContractDetailNo: number;
    @IsNumber()
    @IsOptional()
    ContractId: number;
    @IsString()
    @IsOptional()
    ContractNo: string;
    @IsString()
    @IsOptional()
    status: string;
    @IsString()
    @IsOptional()
    BookingType: string;
    @IsString()
    @IsOptional()
    vehicleType: string;
    @IsString()
    @IsOptional()
    Transmission: string;
    @IsString()
    @IsOptional()
    NoOfVehicles: string;
    @IsString()
    @IsOptional()
    ServiceFromDate: string;
    @IsString()
    @IsOptional()
    ServiceToDate: string;
    @IsString()
    @IsOptional()
    ChargeType: string;
    @IsString()
    @IsOptional()
    ChargeAmount: string;
    @IsString()
    @IsOptional()
    ChargeCurr: string;
       @IsString()
    @IsOptional()
    frequency: string;
    @IsString()
    @IsOptional()
    interval: string;
}
