import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { TripsServicesService } from './trips-services.service';
import { AddTripServicesDto } from '../dto/add-tripServices.dto';
import { UpdateTripServicesDto } from '../dto/update-tripServices.dto';
import { DataSource } from 'typeorm';

@Controller('trips-services')
export class TripsServicesController {
    constructor(private tripservicesService: TripsServicesService) {}

    @Get('/:id')
    fetchService(@Param('id') id: string) {
        return this.tripservicesService.findTripsService(parseInt(id));
    }

    @Get()
    fetchAllServices() {
        return this.tripservicesService.findAllTripsServices();
    }

    @Post('/create')
    addNewService(@Body(ValidationPipe) body: AddTripServicesDto) {
        return this.tripservicesService.createTripService(body);
    }

    @Patch('/:id')
    updateService(
        @Param('id') id: string,
        @Body() body: UpdateTripServicesDto,
    ) {
        return this.tripservicesService.updateTripService(parseInt(id), body);
    }

    @Post('status')
    fetchServiceStatus() {
        return this.tripservicesService.fetchServiceStatus();
    }

    // @Get('services/:reservationId')
    // fetchRelatedServices(@Param('reservationId') reservationId: string) {
    //     return this.tripservicesService.findRelatedTripsService(
    //         parseInt(reservationId),
    //     );
    // }

    @Post('sage')
    fetchSageServices(reservationId) {
        return this.tripservicesService.fetchSageServices(reservationId);
    }

    @Get('sage/:serviceName')
    getRelatedSageServices(@Param('serviceName') serviceName: string) {
        return this.tripservicesService.fetchSageServicesInfo(serviceName);
    }

    @Get('serviceInfo/:serviceId')
    getRelatedTripServiceInfo(@Param('serviceId') serviceId: string) {
        return this.tripservicesService.fetchTripServiceInfo(
            parseInt(serviceId),
        );
    }
}
