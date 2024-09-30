import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationTripEntity } from 'src/entities/reservationTrip.entity';
import { VehiclesEntity } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { ReservationEntity } from 'src/entities/reservation.entity';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(ReservationTripEntity)
        private reservationTripRepository: Repository<ReservationTripEntity>,

        @InjectRepository(VehiclesEntity)
        private vehiclesRepository: Repository<VehiclesEntity>,
    ) { }

    async searchResource(
        reservationNo?: string,
        reservationCategory?: string,
        company?: string,
        tripStatus?: string,
        tripDateFrom?: string,
        tripDateTo?: string,
        vehicleModel?: string,
        branchName?: string,
    ) {
        const queryBuilder = this.reservationTripRepository
            .createQueryBuilder('trip')  // 'trip' is the alias for ReservationTripEntity
            .leftJoinAndSelect('trip.reservation', 'reservation')  // Joins ReservationEntity and selects its fields

            // fields to select from both entities
            .select([
                // Fields from ReservationTripEntity (trip)
                'trip.TripId',
                'trip.TripStatus',
                'trip.FromDateTime',
                'trip.ToDateTime',
                'trip.VehicleModel',
                'trip.DriverId',

                // Fields from ReservationEntity (reservation)
                'reservation.ReservationId',
                'reservation.BookingNo',
                'reservation.BookingDate',
                'reservation.BookingCategory',
                'reservation.BookingType',
                'reservation.Branch',
                'reservation.BookingStatus',
                'reservation.BookingFor',
                'reservation.CompanyCode',
                'reservation.companyName',
                'reservation.PayeeCompanyName',
                'reservation.Remarks',
                'reservation.ChargeType',
                'reservation.ChargeCurr',
                'reservation.Source',
                'reservation.SourceRefNo',
                'reservation.ContractId',
                'reservation.CreatedBy',
                'reservation.CreatedOn',
                'reservation.ModifiedBy',
                'reservation.ModifiedOn'
            ]);

       

        if (reservationNo) {
            queryBuilder.andWhere('reservation.BookingNo = :reservationNo', { reservationNo });
        }

        if (reservationCategory) {
            queryBuilder.andWhere('reservation.BookingCategory = :reservationCategory', { reservationCategory });
        }

        if (company) {
            queryBuilder.andWhere('reservation.CompanyCode = :company', { company });
        }

        if (tripStatus) {
            queryBuilder.andWhere('trip.TripStatus = :tripStatus', { tripStatus });
        }

        if (tripDateFrom) {
            const fromDate = new Date(tripDateFrom);
            queryBuilder.andWhere('trip.FromDateTime >= :tripDateFrom', { tripDateFrom: fromDate });
        }

        if (tripDateTo) {
            const toDate = new Date(tripDateTo);
            queryBuilder.andWhere('trip.ToDateTime <= :tripDateTo', { tripDateTo: toDate });
        }

        if (vehicleModel) {
            queryBuilder.andWhere('trip.VehicleModel = :vehicleModel', { vehicleModel });
        }

        if (branchName) {
            queryBuilder.andWhere('reservation.Branch = :branchName', { branchName });
        }

        
        const results = await queryBuilder.getMany();
        return results;
    }
}
