import { IsOptional } from 'class-validator';

export class UpdateTripIncidentsDto {
    @IsOptional()
    TripId: number;
    @IsOptional()
    ReservationId: number;
    @IsOptional()
    IncidentType: string;
    @IsOptional()
    IncidentRemarks: string;
    @IsOptional()
    ReportedBy: string;
    @IsOptional()
    DriverName: string;
    @IsOptional()
    IncidentDateTime: string;
    @IsOptional()
    Disposition: string;
    @IsOptional()
    ModifiedBy: string;
    @IsOptional()
    ModifiedOn: string;
}
