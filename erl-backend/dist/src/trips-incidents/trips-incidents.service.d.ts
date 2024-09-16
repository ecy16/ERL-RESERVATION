import { TripIncidentsEntity } from '../entities/tripIncidents.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AddTripIncidentsDto } from '../dto/add-tripIncidents.dto';
export declare class TripsIncidentsService {
    private tripincidentsRepo;
    private readonly tripincidentsEntity;
    private readonly tripIncidentDataSource;
    constructor(tripincidentsRepo: Repository<TripIncidentsEntity>, tripincidentsEntity: EntityManager, tripIncidentDataSource: DataSource);
    createTripIncident(addTripsIncidentsDto: AddTripIncidentsDto): Promise<TripIncidentsEntity>;
    findAllTripIncidents(): Promise<TripIncidentsEntity[]>;
    findTripIncident(id: number): Promise<TripIncidentsEntity>;
    updateTripIncident(id: number, attrs: Partial<TripIncidentsEntity>): Promise<TripIncidentsEntity>;
    fetchIncidentTypes(): Promise<any>;
    findRelatedTripsIncident(reservationId: number): Promise<any>;
}
