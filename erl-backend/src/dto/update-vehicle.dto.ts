import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
    @IsString()
    @IsOptional()
    vehicleRegnNO: string;
    @IsString()
    @IsOptional()
    vehicleDescription: string;
    @IsString()
    @IsOptional()
    commissionDate: string;
    @IsString()
    @IsOptional()
    vehicleOwner: string;
    @IsString()
    @IsOptional()
    chassisNumber: string;
    @IsString()
    @IsOptional()
    vehicleStatus: string;
    @IsString()
    @IsOptional()
    vehicleMake: string;
    @IsString()
    @IsOptional()
    vehicleModel: string;
    @IsString()
    @IsOptional()
    vehicleColor: string;
    @IsNumber()
    @IsOptional()
    engineCapacity: string;
    @IsString()
    @IsOptional()
    vehicleType: string;
    @IsString()
    @IsOptional()
    vehicleTransmission: string;
    @IsString()
    @IsOptional()
    inspectionDueDate: string;
    @IsString()
    @IsOptional()
    insuranceDueDate: string;
    @IsString()
    @IsOptional()
    psvDueDate: string;
    @IsString()
    @IsOptional()
    remarks: string;
    @IsString()
    @IsOptional()
    lastServiceDone: string;
    @IsNumber()
    @IsOptional()
    lastOdometerReading: number;
    @IsString()
    ModifiedBy: string;
    @IsString()
    ModifiedOn: string;
    @IsOptional()
    File:string
}
