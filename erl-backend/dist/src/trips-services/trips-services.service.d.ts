import { TripServicesEntity } from '../entities/tripServices.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AddTripServicesDto } from '../dto/add-tripServices.dto';
export declare class TripsServicesService {
    private tripservicesRepo;
    private readonly tripservicesEntity;
    private readonly tripServiceDataSource;
    constructor(tripservicesRepo: Repository<TripServicesEntity>, tripservicesEntity: EntityManager, tripServiceDataSource: DataSource);
    createTripService(addTripsServicesDto: AddTripServicesDto): Promise<TripServicesEntity>;
    findAllTripsServices(): Promise<TripServicesEntity[]>;
    findTripsService(id: number): Promise<TripServicesEntity>;
    updateTripService(id: number, attrs: Partial<TripServicesEntity>): Promise<TripServicesEntity>;
    findRelatedTripsService(reservationId: number): Promise<any>;
    fetchServiceStatus(): Promise<any>;
    fetchSageServices(reservationId: number): Promise<any>;
    fetchSageServicesInfo(serviceName: string): Promise<any>;
    fetchTripServiceInfo(serviceId: number): Promise<any>;
}
