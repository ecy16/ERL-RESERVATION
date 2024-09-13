export declare class TripIncidentsEntity {
    TripIncidentId: number;
    TripId: number;
    ReservationId: number;
    IncidentType: string;
    IncidentRemarks: string;
    ReportedBy: string;
    DriverName: string;
    IncidentDateTime: string;
    Disposition: string;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string;
    ModifiedOn: string;
    constructor(incidents: Partial<TripIncidentsEntity>);
}
