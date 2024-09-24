import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from '../entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([ReservationEntity])],
    controllers: [ReservationsController],
    providers: [ReservationsService,UsersService],
    exports: [TypeOrmModule], 
})
export class ReservationsModule {}
