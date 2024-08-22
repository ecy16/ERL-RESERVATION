import { Module } from '@nestjs/common';
import { ReservationDocumentsController } from './reservation-documents.controller';
import { ReservationDocumentsService } from './reservation-documents.service';

@Module({
  controllers: [ReservationDocumentsController],
  providers: [ReservationDocumentsService]
})
export class ReservationDocumentsModule {}
