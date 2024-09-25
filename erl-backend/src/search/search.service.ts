import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { ReservationTripEntity } from 'src/entities/reservationTrip.entity';
import { VehiclesEntity } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(ReservationEntity)
        private reservationRepository: Repository<ReservationEntity>,

        @InjectRepository(ReservationTripEntity)
        private reservationTripRepository: Repository<ReservationTripEntity>,

        @InjectRepository(VehiclesEntity)
        private vehiclesRepository: Repository<VehiclesEntity>
    ) {}

    async searchResource(
        reservationNo?: string,
        reservationCategory?: string,
        company?: string,
        tripStatus?: string,
        tripDateFrom?: Date,
        tripDateTo?: Date,
        vehicleModel?: string,
        branchName?: string,
    ) {
        const queryBuilder = this.reservationTripRepository
            .createQueryBuilder('trip')
            .leftJoin(ReservationEntity, 'reservation', 'reservation.ReservationId = trip.ReservationId'); 
        if (reservationNo) {
            queryBuilder.andWhere('reservation.BookingNo = :reservationNo', { reservationNo });
        }
    
        if (reservationCategory) {
            queryBuilder.andWhere('reservation.BookingCategory = :reservationCategory', { reservationCategory });
        }
    
        if (company) {
            queryBuilder.andWhere('reservation.CompanyCod e = :company', { company });
        }
    
        if (tripStatus) {
            queryBuilder.andWhere('trip.TripStatus = :tripStatus', { tripStatus });
        }
    
        if (tripDateFrom) {
            queryBuilder.andWhere('trip.FromDateTime >= :tripDateFrom', { tripDateFrom });
        }
    
        if (tripDateTo) {
            queryBuilder.andWhere('trip.ToDateTime <= :tripDateTo', { tripDateTo });
        }
    
        if (vehicleModel) {
            queryBuilder.andWhere('trip.VehicleModel = :vehicleModel', { vehicleModel });
        }
    
        if (branchName) {
            queryBuilder.andWhere('reservation.Branch = :branchName', { branchName }); // Filter by Branch
        }
    
        const results = await queryBuilder.getMany();
        return results;
    }
    
    
}
