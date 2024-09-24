import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class SearchResourceDto {
    @ApiProperty({ example: '001', description: 'Reservation number' })
    @IsOptional()
    @IsString()
    reservationNo?: string;

    @ApiProperty({ example: 'contract', description: 'Reservation category' })
    @IsOptional()
    @IsString()
    reservationCategory?: string;

    @ApiProperty({ example: 'KQ', description: 'Company' })
    @IsOptional()
    @IsString()
    company?: string;

    @ApiProperty({ example: 'inProgress', description: 'Trip status' })
    @IsOptional()
    @IsString()
    tripStatus?: string;

    @ApiProperty({ example: '2024-05-09', description: 'vehicleTrip start date' })
    @IsOptional()
    @IsDateString()
    tripDateFrom?: string;

    @ApiProperty({ example: '2024-06-10', description: 'Trip end date' })
    @IsOptional()
    @IsDateString()
    tripDateTo?: string;

    @ApiProperty({ example: 'prado', description: 'vehicle make' })
    @IsOptional()
    @IsString()
    vehicleModel?: string;

    @ApiProperty({ example: 'Kisumu', description: 'Branch name' })
    @IsOptional()
    @IsString()
    branchName?: string;
}