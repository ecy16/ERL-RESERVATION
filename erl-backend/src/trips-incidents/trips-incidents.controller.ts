import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { TripsIncidentsService } from './trips-incidents.service';
import { AddTripIncidentsDto } from '../dto/add-tripIncidents.dto';
import { UpdateTripIncidentsDto } from '../dto/update-tripIncidents.dto';

@Controller('trips-incidents')
export class TripsIncidentsController {
    constructor(private tripsIncidentsService: TripsIncidentsService) { }

    @Get('/:id')
    fetchTripIncident(@Param('id') id: string) {
        return this.tripsIncidentsService.findTripIncident(parseInt(id));
    }

    @Get()
    fetchAllTripIncidents() {
        return this.tripsIncidentsService.findAllTripIncidents();
    }

    @Post('/create')
    addNewTripIncident(@Body(ValidationPipe) body: AddTripIncidentsDto) {
        return this.tripsIncidentsService.createTripIncident(body);
    }

    @Patch('/:id')
    updateTripIncident(
        @Param('id') id: string,
        @Body() body: UpdateTripIncidentsDto,
    ) {
        return this.tripsIncidentsService.updateTripIncident(
            parseInt(id),
            body,
        );
    }

    @Post('types')
    fetchServiceStatus() {
        return this.tripsIncidentsService.fetchIncidentTypes();
    }

    @Get('incident/:reservationId')
    fetchRelatedServices(@Param('reservationId') reservationId: string) {
        return this.tripsIncidentsService.findRelatedTripsIncident(
            parseInt(reservationId),
        );
    }
}
