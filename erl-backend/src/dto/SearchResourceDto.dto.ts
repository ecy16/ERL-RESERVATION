import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

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

    @ApiProperty({ example: '2024-05-09', description: 'Trip start date' })
    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value ? new Date(value) : null)
    tripDateFrom?: Date;  

    @ApiProperty({ example: '2024-06-10', description: 'Trip end date' })
    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => value ? new Date(value) : null)
    tripDateTo?: Date;  

    @ApiProperty({ example: 'prado', description: 'vehicle make' })
    @IsOptional()
    @IsString()
    vehicleModel?: string;

    @ApiProperty({ example: 'Kisumu', description: 'Branch name' })
    @IsOptional()
    @IsString()
    branchName?: string;
}