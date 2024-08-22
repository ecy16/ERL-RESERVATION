import { IsOptional } from 'class-validator';

export class AddTripIncidentsDto {
    @IsOptional()
    TripIncidentId: number;
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
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
}
