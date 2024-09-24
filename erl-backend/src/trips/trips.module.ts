import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationTripEntity } from '../entities/reservationTrip.entity';
import { ReservationDetailsViewEntity } from 'src/entities/View.entity';
import { VehiclesEntity } from 'src/entities/vehicle.entity';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationTripEntity,ReservationDetailsViewEntity, VehiclesEntity, ReservationEntity]), ReservationsModule],
    providers: [TripsService],
    controllers: [TripsController],
    exports:[TripsService]
})
export class TripsModule {}
