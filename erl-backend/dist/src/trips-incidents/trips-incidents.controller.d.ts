import { TripsIncidentsService } from './trips-incidents.service';
import { AddTripIncidentsDto } from '../dto/add-tripIncidents.dto';
import { UpdateTripIncidentsDto } from '../dto/update-tripIncidents.dto';
export declare class TripsIncidentsController {
    private tripsIncidentsService;
    constructor(tripsIncidentsService: TripsIncidentsService);
    fetchTripIncident(id: string): Promise<import("../entities/tripIncidents.entity").TripIncidentsEntity>;
    fetchAllTripIncidents(): Promise<import("../entities/tripIncidents.entity").TripIncidentsEntity[]>;
    addNewTripIncident(body: AddTripIncidentsDto): Promise<import("../entities/tripIncidents.entity").TripIncidentsEntity>;
    updateTripIncident(id: string, body: UpdateTripIncidentsDto): Promise<import("../entities/tripIncidents.entity").TripIncidentsEntity>;
    fetchServiceStatus(): Promise<any>;
    fetchRelatedServices(reservationId: string): Promise<any>;
}
