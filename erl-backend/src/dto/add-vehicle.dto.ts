import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class AddVehicleDto {
    @ApiProperty({ example: 'reg-101', description: 'vehicle registration number' })
    @IsString()
    @IsOptional()
    vehicleRegNo: string;

    @ApiProperty({ example: 'sample vehicle description', description: 'Vehicle description' })
    @IsString()
    @IsOptional()
    vehicleDescription: string;

    @ApiProperty({ example: '2024-09-23', description: 'vehicle commission date' })
    @IsString()
    @IsOptional()
    commissionDate: string;

    @ApiProperty({ example: 'John Doe', description: 'Vehicle owner' })
    @IsString()
    @IsOptional()
    vehicleOwner: string;

    @ApiProperty({ example: 'chassis101', description: 'Chassis number' })
    @IsOptional()
    @IsString()
    chassisNumber: string;

    @ApiProperty({ example: 'new', description: 'Vehicle status' })
    @IsOptional()
    @IsString()
    vehicleStatus: string;

    @ApiProperty({ example: 'Toyota', description: 'Vehicle make' })
    @IsOptional()
    @IsString()
    vehicleMake: string;

    @ApiProperty({ example: 'Prado', description: 'Vehicle model' })
    @IsOptional()
    @IsString()
    vehicleModel: string;

    @ApiProperty({ example: 'black', description: 'Vehicle color' })
    @IsOptional()
    @IsString()
    vehicleColor: string;

    @ApiProperty({ example: '2000', description: 'Engine capacity' })
    @IsOptional()
    @IsString()
    engineCapacity: string;

    @ApiProperty({ example: 'suv', description: 'vehicle type' })
    @IsOptional()
    @IsString()
    vehicleType: string;

    @ApiProperty({ example: 'automatic', description: 'Vehicle transmission' })
    @IsOptional()
    @IsString()
    vehicleTransmission: string;

    @ApiProperty({ example: '2024-09-23', description: 'Inspection due date' })
    @IsOptional()
    @IsString()
    inspectionDueDate: string;

    @ApiProperty({ example: '2024-09-23', description: 'Insurance due date' })
    @IsOptional()
    @IsString()
    insuranceDueDate: string;

    @ApiProperty({ example: '2024-09-23', description: 'psv due date' })
    @IsOptional()
    @IsString()
    psvDueDate: string;

    @ApiProperty({ example: 'sample text', description: 'remarks' })
    @IsOptional()
    @IsString()
    remarks: string;

    @ApiProperty({ example: 'last service done', description: 'last service done' })
    @IsOptional()
    @IsString()
    lastServiceDone: string;

    @ApiProperty({ example: 100, description: 'last odometer reading' })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    lastOdometerReading: number;

    @ApiProperty({ example: 'Jane doe', description: 'created by' })
    @IsOptional()
    @IsString()
    CreatedBy: string;

    @ApiProperty({ example: '2024-06-23', description: 'Created on' })
    @IsOptional()
    @IsString()
    CreatedOn: string;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Image file' })
    @IsOptional()
    image: Express.Multer.File;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Document file (PDF or TXT)' })
    @IsOptional()
    document: Express.Multer.File;

    // @IsOptional()
    // VehicleMake: string;
    
    // @IsOptional()
    // VehicleModel: string;
    // @IsOptional()
    // vehicleInspectionDate: string;
    // @IsOptional()
    // vehicleInsuranceDate: string;
    // @IsOptional()
    // vehiclePSVDueDate: string;
    // @IsOptional()
    // File: string;

}
