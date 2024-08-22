import { IsOptional } from "class-validator";

export class DriverValidationDto {
    @IsOptional()
    DriverId: number;
    @IsOptional()
    DriverFirstName:string;
    @IsOptional()
    FromDateTime: string;
    @IsOptional()
    ToDateTime: string;
}
