import { ReservationsService } from './reservations.service';
import { AddReservationDto } from '../dto/add-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
export declare class ReservationsController {
    private reservationsService;
    constructor(reservationsService: ReservationsService);
    fetchReservation(id: string): Promise<any>;
    fetchOneReservation(id: string): Promise<import("src/entities/reservation.entity").ReservationEntity>;
    fetchAllReservation(): Promise<any>;
    addNewReservation(body: AddReservationDto): Promise<import("src/entities/reservation.entity").ReservationEntity>;
    updateReservation(id: string, body: UpdateReservationDto): Promise<import("src/entities/reservation.entity").ReservationEntity>;
    fetchCategories(): Promise<any>;
    fetchBookingTypes(): Promise<any>;
    fetchBranch(): Promise<any>;
    fetchBookingStatus(): Promise<any>;
    fetchBookingSource(): Promise<any>;
    fetchChargeType(): Promise<any>;
    fetchBranchNo(Branch: string): Promise<any>;
    searchValue(Body: any): import("rxjs").Observable<import("src/entities/reservation.entity").ReservationEntity[]>;
    searchResourcesValue(Body: any): Promise<import("src/entities/reservation.entity").ReservationEntity[]>;
}
