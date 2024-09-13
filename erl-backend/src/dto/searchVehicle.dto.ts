import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class searchVehicleDto {
    //@IsOptional()
    @IsOptional()
    vehicleRegNo: string;
    //@IsOptional()
    vehicleDescription: string;
    //@IsOptional()
    @IsOptional()
    commissionDate: string;
    //@IsOptional()
    @IsOptional()
    vehicleOwner: string;
    //@IsOptional()
    @IsOptional()
    chassisNumber: string;
    //@IsOptional()
    @IsOptional()
    vehicleStatus: string;
    //@IsOptional()
    @IsOptional()
    vehicleMake: string;
    //@IsOptional()
    @IsOptional()
    vehicleModel: string;
    //@IsOptional()
    vehicleColor: string;
    //@IsNumber()
    @IsOptional()
    engineCapacity: number;
    //@IsOptional()
    vehicleType: string;
    //@IsOptional()
    vehicleTransmission: string;
    //@IsOptional()
    inspectionDueDate: string;
    //@IsOptional()
    insuranceDueDate: string;
    //@IsOptional()
    psvDueDate: string;
    //@IsOptional()
    remarks: string;
    //@IsOptional()
    lastServiceDone: string;
    //@IsNumber()
    lastOdometerReading: number;
    //@IsOptional()
    CreatedBy: string;
    //@IsOptional()
    CreatedOn: string;
}
