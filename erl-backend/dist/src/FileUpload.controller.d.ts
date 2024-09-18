/// <reference types="multer" />
import { FileUploadService } from './FileUpload.service';
export declare class FileUploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFile(file: Express.Multer.File, VehicleId: number, createdBy: string): Promise<{
        message: string;
        attachment: import("./entities/vehicleAttachments.entity").VehicleAttachmentsEntity;
    }>;
}
