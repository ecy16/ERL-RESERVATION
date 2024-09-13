import { Module } from '@nestjs/common';
import { TripsServicesController } from './trips-services.controller';
import { TripsServicesService } from './trips-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripServicesEntity } from '../entities/tripServices.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TripServicesEntity])],
    controllers: [TripsServicesController],
    providers: [TripsServicesService],
})
export class TripsServicesModule {}
