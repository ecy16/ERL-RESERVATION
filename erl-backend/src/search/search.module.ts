import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { VehiclesEntity } from 'src/entities/vehicle.entity';
import { ReservationTripEntity } from 'src/entities/reservationTrip.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    ReservationEntity,
    ReservationTripEntity,
    VehiclesEntity    
  ])],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
