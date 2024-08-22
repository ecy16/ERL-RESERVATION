import { Controller, Get, Param } from '@nestjs/common';
import { ReservationDocumentsService } from './reservation-documents.service';

@Controller('reservation-documents')
export class ReservationDocumentsController {


    constructor(private reservationsDocumentsService:ReservationDocumentsService){}

    @Get('/:id')
    getRentalAgreement(@Param('id') id: string) {
        return this.reservationsDocumentsService.fetchRentalAgreement(parseInt(id));
    }


}
