import { ReservationTripEntity } from './reservationTrip.entity';
export declare class ReservationEntity {
    ReservationId: number;
    BookingNo: string;
    BookingDate: string;
    BookingCategory: string;
    BookingType: string;
    Branch: string;
    BookingStatus: string;
    BookingFor: string;
    CompanyCode: string;
    companyName: string;
    PayeeCompanyName: string;
    Remarks: string;
    ChargeType: string;
    ChargeCurr: string;
    Source: string;
    SourceRefNo: string;
    ContractId: number;
    CreatedBy: string;
    CreatedOn: string;
    ModifiedBy: string;
    ModifiedOn: string;
    reservationTrips: ReservationTripEntity[];
    constructor(reservations: Partial<ReservationEntity>);
}
