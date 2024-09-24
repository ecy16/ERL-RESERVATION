import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { AddTripDto } from '../dto/add-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { VehicleValidationDto } from 'src/dto/vehicleValidation.dto';
import { DriverValidationDto } from 'src/dto/driverValidation.dto';
import { VehicleMovementDto } from 'src/dto/vehicleMovement.dto';
import { SearchService } from 'src/search/search.service';
import { SearchResourceDto } from 'src/dto/SearchResourceDto.dto';

@Controller('trips')
export class TripsController {
    constructor(private tripService: TripsService, private readonly searchService: SearchService) { }

    @Get('/:id')
    fetchTrips(@Param('id') id: number) {
        return this.tripService.findTrips((id));
    }


    @Get('ById/:id')
    getOneTrip(@Param('id') id: number) {
        return this.tripService.findTrips1((id));
    }

    @Get()
    getAllTrips() {
        return this.tripService.findAllTrips();
    }

    @Post('fuelLevel')
    fetchFuelLevel() {
        return this.tripService.fetchFuelLevel();
    }

    @Post('driverService')
    fetchDriverServiceStatus() {
        return this.tripService.driverService();
    }

    @Post('tripStatus')
    fetchTripStatus() {
        return this.tripService.tripStatus();
    }


    @Post('/create')
    addNewTrip(@Body(ValidationPipe) body: AddTripDto) {
        return this.tripService.createTrip(body);
    }


    @Patch('update/:id')
    updateTripById(@Param('id') id: string, @Body() body: UpdateTripDto) {
        return this.tripService.updateTrip(parseInt(id), body);
    }

    // @Get('')
    // getTrips() {
    //     return this.tripService.findAllTrips_ds();
    // }

    @Get('trip/:TripId')
    fetchRelatedTrips(@Param('TripId') reservationId: string) {
        return this.tripService.findRelatedTrips(parseInt(reservationId));
    }
    @Get('Asstrip/:id')
    findAssignmentTrips(@Param('id') id: string) {
        return this.tripService.findRelatedTrips(parseInt(id));
    }
    @Post('/sorted')
    fetchSortedTrips() {
        return this.tripService.fetchSortedTrips();
    }
    @Post('/vehicleMovements/:TripId')
    addVehicleMovement(@Param('TripId') TripId: string, @Body() body: VehicleMovementDto) {
        return this.tripService.addVehicleMovement(parseInt(TripId), body)
    }

    @Get('delivered/:TripId')
    fetchDeliverTrips(@Param('TripId') TripId: string) {
        return this.tripService.fetchDeliverTrips(parseInt(TripId));;
    }


    @Post('all')
    fetchAllTrips() {
        return this.tripService.findAllTrips();

    }

    @Get('tripLast/:reservationId')
    fetchLastRelatedTrips(@Param('reservationId') reservationId: string) {
        return this.tripService.findLastRelatedTrips(parseInt(reservationId));
    }

    @Get('findTrip/:reservationId')
    getRelatedReservationTrip(@Param('reservationId') reservationId: string) {
        return this.tripService.findRelatedReservationTrips(parseInt(reservationId));
    }
    @Get('fetchResvTrip/:reservationId')
    fetchResvTrip(@Param('reservationId') reservationId: string) {
        return this.tripService.fetchResvTrip(parseInt(reservationId));
    }

    @Get('assign-car/:model')
    assignVehicle(@Param('model') model: any) {
        return this.tripService.assignVehicle(model);
    }

    // @Post('/validateVehicle')
    // validateVehicle(@Query('VehicleId') VehicleId: string, @Query('FromDateTime') FromDateTime: string, @Query('VehicleId') ToDateTime: string) {
    //     return this.tripService.assignReg(VehicleId, FromDateTime, ToDateTime)
    // }


    @Post('/validateVehicle')
    validateVehicle(@Body(ValidationPipe) body: VehicleValidationDto) {
        console.log(body);
        return this.tripService.assignReg(body)
    }

    @Post('/validateDriver')
    validateDriver(@Body(ValidationPipe) body: DriverValidationDto) {
        // console.log(Body);
        // return body;
        return this.tripService.assignDriver(body)
    }
    @Post('/search')
    searchResourcesValue(@Body() Body: any) {
        return this.tripService.searchResources(Body)
    }

    @Post('/resources/search')
    async searchResources(@Body() searchDto: SearchResourceDto) {
        return this.searchService.searchResource(
            searchDto.reservationNo,
            searchDto.reservationCategory,
            searchDto.company,
            searchDto.tripStatus,
            searchDto.tripDateFrom,
            searchDto.tripDateTo,
            searchDto.vehicleModel,
            searchDto.branchName,
        )
    }



}

