import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { TripServicesEntity } from './tripServices.entity';
import { TripIncidentsEntity } from './tripIncidents.entity';

@Entity('_cplReservationTrips')
export class ReservationTripEntity {
    @PrimaryGeneratedColumn()
    TripId: number;
    @Column({ nullable: true })
    TripNo: number;
    @Column({ nullable: true })
    ReservationId: number;
    @Column({ nullable: true })
    DriverId: number;
    @Column({ nullable: true })
    DriverFirstName: string;
    @Column({ nullable: true })
    DriverServiceStatus: string;
    @Column({ nullable: true })
    DriverRemarks: string;
    @Column({ nullable: true })
    VehicleId: number;
    @Column({ nullable: true })
    TripStatus: string;
    @Column({ nullable: true })
    VehicleRemarks: string;
    @Column('datetime', { nullable: true })
    FromDateTime: string;
    @Column('datetime', { nullable: true })
    ToDateTime: string;
    @Column({ nullable: true })
    FlightNo: string;
    @Column( { nullable: true })
    FlightDateTime: string;
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
    @Column( { nullable: true })
    PickupFirstName: string;
    @Column( { nullable: true })
    PickupLastName: string;

    constructor(trips: Partial<ReservationTripEntity>) {
        Object.assign(this, trips);
    }

    // @ManyToOne(
    //     () => ReservationEntity,
    //     (reservation) => reservation.reservationTrips,
    // )
    // reservation: ReservationEntity;

    // @OneToMany(
    //     () => TripServicesEntity,
    //     (tripService) => tripService.reservationTrip,
    // )
    // tripServices: TripServicesEntity[];

    // @OneToMany(
    //     () => TripIncidentsEntity,
    //     (tripIncident) => tripIncident.reservationTrip,
    // )
    // tripIncidents: TripIncidentsEntity[];
}
