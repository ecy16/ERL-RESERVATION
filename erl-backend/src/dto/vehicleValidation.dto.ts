import { IsOptional } from "class-validator";

export class VehicleValidationDto {
    @IsOptional()
    vehicleID: number;
    @IsOptional()
    FromDateTime: string;
    @IsOptional()
    ToDateTime: string;
    
}
