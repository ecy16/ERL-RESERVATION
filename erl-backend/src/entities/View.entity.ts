import { Entity, ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    expression: `
        SELECT 
            c.vehicleRegNo,
            a.*, 
            d.DriverFirstName + ' ' + d.DriverLastName AS DriverName,
            b.BookingFor,
            e.ContractId,
            d.email,
            CASE 
                WHEN b.companyName = ' ' THEN e.companyName 
                ELSE b.companyName 
            END AS companyName,
            b.BookingCategory,
            b.BookingNo,
            FORMAT(FlightDateTime, 'dd-MM-yyyy HH:mm') AS FlightDate,
            FORMAT(FromDateTime, 'dd-MM-yyyy') AS FromDate,
            FORMAT(ToDateTime, 'dd-MM-yyyy') AS ToDate,
            FORMAT(FromDateTime, 'HH:mm:ss') AS FromTime,
            FORMAT(ToDateTime, 'HH:mm:ss') AS ToTime
        FROM _cplReservationTrips a 
        JOIN _cplReservations b ON a.ReservationId = b.ReservationId
        LEFT JOIN _cplVehicles c ON a.VehicleId = c.vehicleID
        LEFT JOIN _cplChaufferDrivers d ON a.DriverId = d.DriverId
        LEFT JOIN _cplContracts e ON b.ContractId = e.ContractId
    `,
})
export class ReservationDetailsViewEntity {
    @ViewColumn()
    vehicleRegNo: string;

    @ViewColumn()
    ReservationId: number;

    @ViewColumn()
    DriverName: string;

    @ViewColumn()
    BookingFor: string;

    @ViewColumn()
    ContractId: number;

    @ViewColumn()
    email: string;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    BookingCategory: string;

    @ViewColumn()
    BookingNo: string;

    @ViewColumn()
    FlightDate: string;

    @ViewColumn()
    FromDate: string;

    @ViewColumn()
    ToDate: string;

    @ViewColumn()
    FromTime: string;

    @ViewColumn()
    ToTime: string;
    @ViewColumn()
    Branch: string;
}
