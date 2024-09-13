export declare class TripServicesEntity {
    ServiceId: number;
    TripId: number;
    ReservationId: number;
    serviceName: string;
    serviceCode: string;
    TripCharge: string;
    TripServiceStatus: string;
    InvoiceNo: number;
    InvoiceLineNo: number;
    InvoiceDate: string;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string;
    ModifiedOn: string;
    constructor(services: Partial<TripServicesEntity>);
}
