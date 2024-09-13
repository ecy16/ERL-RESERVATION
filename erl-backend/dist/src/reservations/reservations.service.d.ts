import { DataSource, EntityManager, Repository } from 'typeorm';
import { ReservationEntity } from '../entities/reservation.entity';
import { AddReservationDto } from '../dto/add-reservation.dto';
import { AddReservationPaymentsDto } from "../dto/add-reservationPayments.dto";
import { SearchReservationsDto } from 'src/dto/search-reservations.dto';
import { SearchResourcesDto } from 'src/dto/search-resources.dto';
import { Observable } from 'rxjs';
export declare class ReservationsService {
    private reservationRepo;
    private readonly reservationEntity;
    private readonly reservDataSource;
    constructor(reservationRepo: Repository<ReservationEntity>, reservationEntity: EntityManager, reservDataSource: DataSource);
    findLastRec(Branch: string): Promise<any>;
    searchView(searchReservationsDto: SearchReservationsDto): Observable<ReservationEntity[]>;
    searchResources(SearchResourcesDto: SearchResourcesDto): Promise<ReservationEntity[]>;
    createReservation(addReservationDto: AddReservationDto): Promise<ReservationEntity>;
    fetchBookingRules(Branch: string): Promise<any>;
    findAllReservations(): Promise<any>;
    findReservations(id: number): Promise<ReservationEntity>;
    findReservationsById(reservationId: number): Promise<any>;
    updateReservation(id: number, attrs: Partial<ReservationEntity>): Promise<ReservationEntity>;
    findBookingCategory(): Promise<any>;
    findBookingType(): Promise<any>;
    findBookingBranch(): Promise<any>;
    findBookingStatus(): Promise<any>;
    findBookingChargeType(): Promise<any>;
    findBookingSource(): Promise<any>;
    AddBookingPaymentDetails(id: any, addReservationPaymentsDto: AddReservationPaymentsDto): Promise<void>;
}
