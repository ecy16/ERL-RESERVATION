import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationTripEntity } from './reservationTrip.entity';

@Entity('_cplTripIncidents')
export class TripIncidentsEntity {
    @PrimaryGeneratedColumn()
    TripIncidentId: number;
    @Column({ nullable: true })
    TripId: number;
    @Column({ nullable: true })
    ReservationId: number;
    @Column({ nullable: true })
    IncidentType: string;
    @Column({ nullable: true })
    IncidentRemarks: string;
    @Column({ nullable: true })
    ReportedBy: string;
    @Column({ nullable: true })
    DriverName: string;
    @Column({ nullable: true })
    IncidentDateTime: string;
    @Column({ nullable: true })
    Disposition: string;
    @Column({ nullable: true })
    CreatedBy: string;
    @Column({ nullable: true })
    CreatedOn: string;
    @Column({ nullable: true })
    ModifiedBy: string;
    @Column({ nullable: true })
    ModifiedOn: string;

    constructor(incidents: Partial<TripIncidentsEntity>) {
        Object.assign(this, incidents);
    }

    // @ManyToOne(
    //     () => ReservationTripEntity,
    //     (reservationTrip) => reservationTrip.tripIncidents,
    // )
    // reservationTrip: ReservationTripEntity;
}
