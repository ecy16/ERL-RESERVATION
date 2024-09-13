/// <reference types="multer" />
import { Repository } from 'typeorm';
import { VehicleAttachmentsEntity } from './entities/vehicleAttachments.entity';
import { DocAttachmentsEntity } from './entities/docAttachments.entity';
export declare class FileUploadService {
    private readonly vehicleAttachmentsRepo;
    private readonly docAttachmentsRepo;
    constructor(vehicleAttachmentsRepo: Repository<VehicleAttachmentsEntity>, docAttachmentsRepo: Repository<DocAttachmentsEntity>);
    saveAttachment(VehicleId: number, file: Express.Multer.File, createdBy: string): Promise<VehicleAttachmentsEntity>;
    getFilePathByAttachmentId(attachmentId: number): Promise<string>;
}
