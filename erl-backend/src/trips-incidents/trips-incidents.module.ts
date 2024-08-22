import { Module } from '@nestjs/common';
import { TripIncidentsEntity } from '../entities/tripIncidents.entity';
import { TripsIncidentsController } from './trips-incidents.controller';
import { TripsIncidentsService } from './trips-incidents.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([TripIncidentsEntity])],
    controllers: [TripsIncidentsController],
    providers: [TripsIncidentsService],
})
export class TripsIncidentsModule {}
