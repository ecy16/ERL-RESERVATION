import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleAttachmentsEntity } from './entities/vehicleAttachments.entity';
import { DocAttachmentsEntity } from './entities/docAttachments.entity';

@Injectable()
export class FileUploadService {
    constructor(
        @InjectRepository(VehicleAttachmentsEntity)
        private readonly vehicleAttachmentsRepo: Repository<VehicleAttachmentsEntity>,
        @InjectRepository(DocAttachmentsEntity)
        private readonly docAttachmentsRepo: Repository<DocAttachmentsEntity>,
    ) {}

    async saveAttachment(VehicleId: number, file: Express.Multer.File, createdBy: string): Promise<VehicleAttachmentsEntity> {
        // Save file information in DocAttachmentsEntity
        const docAttachment = this.docAttachmentsRepo.create({
            DocPath: file.path,
            DocFolder: 'some/folder', // Adjust as necessary
            DocName: file.originalname,
            CreatedBy: createdBy,
        });
        const savedDocAttachment = await this.docAttachmentsRepo.save(docAttachment);
    
        // Save attachment record
        const vehicleAttachment = this.vehicleAttachmentsRepo.create({
            VehicleId: VehicleId,
            DocId: savedDocAttachment.DocId,
            CreatedBy: createdBy,
        });
        return this.vehicleAttachmentsRepo.save(vehicleAttachment);
    }
    
    async getFilePathByAttachmentId(attachmentId: number): Promise<string> {
        // Fetch the vehicle attachment
        const vehicleAttachment = await this.vehicleAttachmentsRepo.findOne({
            where: { AttachmentId: attachmentId }, // Ensure the property name matches your entity
        });
    
        if (!vehicleAttachment) {
            throw new Error('Attachment not found');
        }
    
        // Fetch the document attachment to get the file path
        const docAttachment = await this.docAttachmentsRepo.findOne({
            where: { DocId: vehicleAttachment.DocId },
        });
    
        if (!docAttachment) {
            throw new Error('Document not found');
        }
    
        return docAttachment.DocPath;
    }
    
}
