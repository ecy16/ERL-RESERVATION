import { IsOptional } from "class-validator";

export class VehicleValidationDto {
    @IsOptional()
    VehicleId: number;
    @IsOptional()
    FromDateTime: string;
    @IsOptional()
    ToDateTime: string;
}
