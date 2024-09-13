import { Column, Entity, PrimaryGeneratedColumn, Transaction } from "typeorm";
@Entity('_cplTransactions')

export class TransactionEntity {
    @PrimaryGeneratedColumn()
    TransactionId: number;
    @Column({ nullable: false })
    TripId: number;
    @Column({ nullable: true })
    ReservationId: number;
    @Column({ nullable: false })
    BookingNo: string;
    @Column({ nullable: false })
     tripNumber: number;
    @Column({ nullable: true })
    DriverId: number;
    @Column({ nullable: true })
    DriverFirstName: string;
    @Column({ nullable: true })
    DriverServiceStatus: string;
    @Column({ nullable: true })
    DriverRemarks: string;
    @Column({ nullable: true })
    TripStatus: string;
    @Column({ nullable: true })
    VehicleRemarks: string;
    @Column('datetime', { nullable: true })
    FromDateTime: string;
    @Column('datetime', { nullable: true })
    ToDateTime: string;
    @Column({ nullable: true })
    ArrivalFlightNo: string;
    @Column({ nullable: true })
    DepartureFlightNo: string;
    @Column({ nullable: true })
    ArrivalFlightDateTime: string;
    @Column({ nullable: true })
    DepartureFlightDateTime: string;
    @Column({ nullable: true })
    Airline: string;
    @Column({ nullable: true })
    PickupAddress: string;
    @Column({ nullable: true })
    PickupContactNo: string;
    @Column({ nullable: true })
    PickupEmail: string;
    @Column({ nullable: true })
    DropAddress: string;
    @Column({ nullable: true })
    RouteCode: string;
    @Column({ nullable: true })
    ReqVehicleType: string;
    @Column({ nullable: true })
    VehicleMake: string;
    @Column({ nullable: true })
    vehicleRegNo: string;
    @Column({ nullable: true })
    VehicleModel: string;
    @Column('float', { nullable: true })
    MileageCap: number;
    @Column({ nullable: true, default: 0 })
    MileageIN: number;
    @Column({ nullable: true, default: 0 })
    MileageOUT: number;
    @Column({ nullable: true, default: 0 })
    FuelIN: number;
    @Column({ nullable: true, default: 0 })
    FuelOUT: number;
    @Column({ nullable: true })
    CheckOUTBy: string;
    @Column({ nullable: true })
    CheckINBy: string;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column('datetime', { nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column('datetime', { nullable: true })
    ModifiedOn: string;
    @Column({ nullable: true })
    PickupFirstName: string;
    @Column({ nullable: true })
    PickupLastName: string;
    @Column({ nullable: true })
    Remarks: string;
    @Column({ nullable: true })
    vehicleID: number;
    @Column({ nullable: true })
    Transaction: string;
    @Column({ nullable: true })
    ServiceId: number;
    @Column({ nullable: true })
    serviceName: string;
    @Column({ nullable: true })
    serviceCode: string;
    @Column('float', { nullable: true })
    TripCharge: string;
    @Column({ nullable: true })
    TripServiceStatus: string;
    @Column({ nullable: true })
    InvoiceNo: number;
    @Column({ nullable: true })
    InvoiceLineNo: number;
    @Column('date', { nullable: true })
    InvoiceDate: string;



   


}
