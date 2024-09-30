import { IsOptional } from "class-validator";

export class VehicleValidationDto {
    @IsOptional()
    vehicleID: number;
        @IsOptional()
        vehicleRegNo:string
        @IsOptional()
    FromDateTime: Date;
    @IsOptional()
    ToDateTime: Date;
    
}
