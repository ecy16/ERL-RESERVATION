import { ReservationDocumentsService } from './reservation-documents.service';
export declare class ReservationDocumentsController {
    private reservationsDocumentsService;
    constructor(reservationsDocumentsService: ReservationDocumentsService);
    getRentalAgreement(id: string): Promise<any>;
}
