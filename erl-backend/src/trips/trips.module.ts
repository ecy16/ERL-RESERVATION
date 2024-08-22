import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationTripEntity } from '../entities/reservationTrip.entity';
import { ReservationDetailsViewEntity } from 'src/entities/View.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationTripEntity,ReservationDetailsViewEntity])],
    providers: [TripsService],
    controllers: [TripsController],
    exports:[TripsService]
})
export class TripsModule {}
