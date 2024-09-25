import { Module } from '@nestjs/common';
import { TripsServicesController } from './trips-services.controller';
import { TripsServicesService } from './trips-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripServicesEntity } from '../entities/tripServices.entity';
import { ReservationTripEntity } from 'src/entities/reservationTrip.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TripServicesEntity, ReservationTripEntity])],
    controllers: [TripsServicesController],
    providers: [TripsServicesService],
})
export class TripsServicesModule {}
