/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { AddReservationDto } from '../dto/add-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/roles.decorator';

@Controller('reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) { }

    @Get('/:id')
    fetchReservation(@Param('id') id: string) {
        return this.reservationsService.findReservationsById(parseInt(id));
    }
    @Get('/details/:id')
    fetchOneReservation(@Param('id') id: string) {
        return this.reservationsService.findReservations(parseInt(id));
    }

    @Get()
    // @UseGuards(RolesGuard)
    // @Roles('Admin')
    fetchAllReservation() {
        // return ('hello world')
        return this.reservationsService.findAllReservations();
    }


    @Post('/create')
    addNewReservation(@Body(ValidationPipe) body: AddReservationDto) {
        // const lastNo = this.reservationsService.findLastRec()
        return this.reservationsService.createReservation(body);
        // return(body.)
    }

    @Patch('/:id')
    updateReservation(
        @Param('id') id: string,
        @Body() body: UpdateReservationDto,
    ) {
        return this.reservationsService.updateReservation(parseInt(id), body);
    }

    @Post('categories')
    fetchCategories() {
        return this.reservationsService.findBookingCategory()
    }

    @Post('type')
    fetchBookingTypes() {
        return this.reservationsService.findBookingType()

    } @Post('branch')
    fetchBranch() {
        return this.reservationsService.findBookingBranch()
    }
    @Post('status')
    fetchBookingStatus() {
        return this.reservationsService.findBookingStatus()
    }
    @Post('source')
    fetchBookingSource() {
        return this.reservationsService.findBookingSource()

    }

    @Post('charge')
    fetchChargeType() {
        return this.reservationsService.findBookingChargeType()
    }
    @Post('LastNo/:Branch')
    fetchBranchNo(@Param('Branch') Branch: string) {
        return this.reservationsService.fetchBookingRules(Branch)
    }

    @Post('search')
    searchValue(@Body() Body:any) {
        return this.reservationsService.searchView(Body)
    }
    @Post('/search')
    searchResourcesValue(@Body() Body:any) {
        return this.reservationsService.searchResources(Body)
    }



}
