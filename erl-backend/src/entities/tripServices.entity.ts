import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationTripEntity } from './reservationTrip.entity';
@Entity('_cplTripServices')
export class TripServicesEntity {
    @PrimaryGeneratedColumn()
    ServiceId: number;
    @Column({ nullable: true })
    TripId: number;
    @Column({ nullable: true })
    ReservationId: number;
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
    @Column({ nullable: true })
    TripCategory: string; // Added trip category column

    @Column({ nullable: true })
    TripSubCategory: string; // Added subcategory column
    @Column({ nullable: true })
    CreatedBy: string;
    @Column('datetime', { nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column('datetime', { nullable: true })
    ModifiedOn: string;

    constructor(services: Partial<TripServicesEntity>) {
        Object.assign(this, services);
    }

    // @ManyToOne(
    //     () => ReservationTripEntity,
    //     (reservationTrip) => reservationTrip.tripServices,
    // )
    // reservationTrip: ReservationTripEntity;
}
