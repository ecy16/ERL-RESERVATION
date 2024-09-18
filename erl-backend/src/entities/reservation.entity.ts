/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationTripEntity } from './reservationTrip.entity';

@Entity('_cplReservations')
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    ReservationId: number;
    @Column({ nullable: true, unique: true })
    BookingNo: string;
    @Column()
    BookingDate: string;
    @Column()
    BookingCategory: string;
    @Column()
    BookingType: string;
    @Column()
    Branch: string;
    @Column({ default: 'InProgress' })
    BookingStatus: string;
    @Column({ nullable: true })
    BookingFor: string;
    @Column({ nullable: true })
    CompanyCode: string;
    @Column({ nullable: true })
    companyName: string;
    @Column({ nullable: true })
    PayeeCompanyName: string;
    @Column({ nullable: true })
    Remarks: string;
    @Column({ nullable: true })
    ChargeType: string;
    @Column({ nullable: true })
    ChargeCurr: string;

    // @Column('decimal', { nullable: true })
    // TotalAmount: number;
    // @Column('decimal', { nullable: true })
    // TotalPaid: number;
    // @Column('decimal', { default: 0 })
    // ExchangeRate: number;
    @Column({ nullable: true })
    Source: string;
    @Column({ nullable: true })
    SourceRefNo: string;
    @Column({ nullable: true })
    ContractId: number;
    @Column({ nullable: true, default: 'Admin' })
    CreatedBy: string;
    @Column({ type: 'datetime', nullable: true, default: () => 'GETDATE()' })
    CreatedOn: string;

    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ type: 'datetime', nullable: true })
    ModifiedOn: string;
    // reservationTrips: any;
    @OneToMany(() => ReservationTripEntity, (reservation) => reservation.reservationId)
    reservationTrips: ReservationTripEntity[]

    constructor(reservations: Partial<ReservationEntity>) {
        Object.assign(this, reservations);
    }
    // @OneToMany(
    //     () => ReservationTripEntity,
    //     (reservationTrip) => reservationTrip.reservation,
    // )
    // reservationTrips: any[];
}
