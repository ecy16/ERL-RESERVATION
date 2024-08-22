import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReservationPaymentsDto{

    @IsString()
    @IsOptional()
    ChargeType: string;
    @IsString()
    @IsOptional()
    ChargeCurr: string;
    @IsNumber()
    @IsOptional()
    TotalAmount: number;
    @IsNumber()
    @IsOptional()
    TotalPaid: number;
    @IsNumber()
    @IsOptional()
    ExchangeRate: number = 1;
}
