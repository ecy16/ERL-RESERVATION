import { DocAttachmentsEntity } from './docAttachments.entity';
import { SelfDriversEntity } from './selfDrivers.entity';
export declare class ReservationDocsEntity {
    ReservationDocId: number;
    doc: DocAttachmentsEntity;
    booking: SelfDriversEntity;
    CreatedBy: string;
    CreatedOn: Date;
    ModifiedBy?: string;
    ModifiedOn?: Date;
}
