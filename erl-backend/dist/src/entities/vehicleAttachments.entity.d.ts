export declare class VehicleAttachmentsEntity {
    AttachmentId: number;
    VehicleId: number;
    DocId: number;
    CreatedBy: string;
    CreatedOn: Date;
    ModifiedBy: string;
    ModifiedOn: string;
    constructor(vehicleAttachments: Partial<VehicleAttachmentsEntity>);
}
