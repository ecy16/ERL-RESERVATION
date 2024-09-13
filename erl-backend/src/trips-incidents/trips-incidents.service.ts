import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripIncidentsEntity } from '../entities/tripIncidents.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AddTripIncidentsDto } from '../dto/add-tripIncidents.dto';

@Injectable()
export class TripsIncidentsService {
    constructor(
        @InjectRepository(TripIncidentsEntity)
        private tripincidentsRepo: Repository<TripIncidentsEntity>,
        private readonly tripincidentsEntity: EntityManager,
        private readonly tripIncidentDataSource: DataSource,
    ) {}

    async createTripIncident(addTripsIncidentsDto: AddTripIncidentsDto) {
        const tripIncidents = new TripIncidentsEntity(addTripsIncidentsDto);
        try {
            return await this.tripincidentsEntity.save(tripIncidents);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async findAllTripIncidents() {
        try {
            return await this.tripincidentsRepo.find();
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    findTripIncident(id: number) {
        return this.tripincidentsRepo.findOne({
            where: { TripIncidentId: id },
        });
    }

    async updateTripIncident(id: number, attrs: Partial<TripIncidentsEntity>) {
        const incidents = await this.findTripIncident(id);
        if (!incidents) {
            throw new NotFoundException('services not found');
        }
        Object.assign(incidents, attrs);
        return this.tripincidentsRepo.save(incidents);
    }

    async fetchIncidentTypes() {
        const incidentType =
            await this.tripIncidentDataSource.createQueryRunner();
        await incidentType.connect();
        try {
            await incidentType.startTransaction();
            const incident = await incidentType.manager.query(
                `select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1 `,
                ['TripIncidents', 'Type'],
            );
            // console.log('helleo')
            await incidentType.commitTransaction();
            return incident;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
        // throw new Error(`Failed to find booking type: ${e.message}`);\
    }

    async findRelatedTripsIncident(reservationId: number) {
        const incident = this.tripIncidentDataSource.createQueryRunner();
        await incident.connect();
        try {
            await incident.startTransaction();
            const incidentInfo = await incident.query(
                `select  * from _cplTripIncidents where ReservationId=@0`,
                [reservationId],
            );
            await incident.commitTransaction();
            return incidentInfo;
        } catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
}
