import { TripsServicesService } from './trips-services.service';
import { AddTripServicesDto } from '../dto/add-tripServices.dto';
import { UpdateTripServicesDto } from '../dto/update-tripServices.dto';
export declare class TripsServicesController {
    private tripservicesService;
    constructor(tripservicesService: TripsServicesService);
    fetchService(id: string): Promise<import("../entities/tripServices.entity").TripServicesEntity>;
    fetchAllServices(): Promise<import("../entities/tripServices.entity").TripServicesEntity[]>;
    addNewService(body: AddTripServicesDto): Promise<import("../entities/tripServices.entity").TripServicesEntity>;
    updateService(id: string, body: UpdateTripServicesDto): Promise<import("../entities/tripServices.entity").TripServicesEntity>;
    fetchServiceStatus(): Promise<any>;
    fetchSageServices(reservationId: any): Promise<any>;
    getRelatedSageServices(serviceName: string): Promise<any>;
    getRelatedTripServiceInfo(serviceId: string): Promise<any>;
}
