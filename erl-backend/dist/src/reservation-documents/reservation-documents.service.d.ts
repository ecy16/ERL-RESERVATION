import { DataSource } from 'typeorm';
export declare class ReservationDocumentsService {
    private readonly documentsDataSource;
    constructor(documentsDataSource: DataSource);
    fetchRentalAgreement(reservationId: number): Promise<any>;
}
