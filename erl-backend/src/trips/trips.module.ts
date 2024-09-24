import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationTripEntity } from '../entities/reservationTrip.entity';
import { ReservationDetailsViewEntity } from 'src/entities/View.entity';
import { SearchModule } from 'src/search/search.module';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationTripEntity,ReservationDetailsViewEntity]),SearchModule],
    providers: [TripsService],
    controllers: [TripsController],
    exports: [TypeOrmModule.forFeature([ReservationTripEntity])],
})
export class TripsModule {}
