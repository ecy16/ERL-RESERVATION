import { IsOptional, IsString, IsDateString } from 'class-validator';

export class SearchResourceDto {
    @IsOptional()
    @IsString()
    reservationNo?: string;

    @IsOptional()
    @IsString()
    reservationCategory?: string;

    @IsOptional()
    @IsString()
    company?: string;

    @IsOptional()
    @IsString()
    tripStatus?: string;

    @IsOptional()
    @IsDateString()
    tripDateFrom?: string;

    @IsOptional()
    @IsDateString()
    tripDateTo?: string;

    @IsOptional()
    @IsString()
    vehicleModel?: string;

    @IsOptional()
    @IsString()
    branchName?: string;
}