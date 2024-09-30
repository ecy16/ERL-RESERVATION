import { IsOptional } from "class-validator";

export class DriverValidationDto {
    @IsOptional()
    DriverId: number;
    @IsOptional()
    DriverFirstName:string;
    @IsOptional()
    FromDateTime: Date;
    @IsOptional()
    ToDateTime: Date;
}
