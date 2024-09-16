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
    PickupAddress: string;
    @Column({ nullable: true })
    PickupContactNo: string;
    @Column({ nullable: true })
    PickupEmail: string;
    @Column({ nullable: true })
    DropAddress: string;

    @Column({ nullable: true })
    VehicleMake: string;
    @Column({ nullable: true })
    vehicleRegNo: string;
    @Column({ nullable: true })
    VehicleModel: string;
    @Column({ nullable: true, default: 0 })
    MileageIN: number;
    @Column({ nullable: true, default: 0 })
    MileageOUT: number;
    @Column({ nullable: true, default: 0 })
    FuelIN: number;
    @Column({ nullable: true, default: 0 })
    FuelOUT: number;
    @Column({ nullable: true })

    @Column({ nullable: true })
    Remarks: string;
    @Column({ nullable: true })
    vehicleID: number;


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
    @Column({ nullable: true })
    BookingCategory: string;
    @Column({ nullable: true })
    companyName: string;
    @Column({ nullable: true })
    BookingFor: string;
    @Column({ nullable: true })
    Transaction: string;
    constructor(transactions: Partial<TransactionEntity>) {
        Object.assign(this, transactions);
    }



}
