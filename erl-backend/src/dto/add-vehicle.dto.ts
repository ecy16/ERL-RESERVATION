import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class AddVehicleDto {
    @IsOptional()
    vehicleRegNo: string;
    @IsOptional()
    vehicleDescription: string;
    @IsOptional()
    commissionDate: string;
    @IsOptional()
    vehicleOwner: string;
    @IsOptional()
    chassisNumber: string;
    @IsOptional()
    vehicleStatus: string;
    @IsOptional()
    vehicleMake: string;
    @IsOptional()
    vehicleModel: string;
    @IsOptional()
    vehicleColor: string;
    @IsOptional()
    engineCapacity: string;
    @IsOptional()
    vehicleType: string;
    @IsOptional()
    vehicleTransmission: string;
    @IsOptional()
    inspectionDueDate: string;
    @IsOptional()
    insuranceDueDate: string;
    @IsOptional()
    psvDueDate: string;
    @IsOptional()
    remarks: string;
    @IsOptional()
    lastServiceDone: string;
    @IsNumber()
    @IsOptional()
    lastOdometerReading: number;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
    @IsOptional()
    VehicleMake: string;
    @IsOptional()
    VehicleModel: string;
    @IsOptional()
    vehicleInspectionDate: string;
    @IsOptional()
    vehicleInsuranceDate: string;
    @IsOptional()
    vehiclePSVDueDate: string;
    @IsOptional()
    File: string;

}
