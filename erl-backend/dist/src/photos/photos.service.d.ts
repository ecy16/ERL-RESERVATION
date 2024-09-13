/// <reference types="Multer" />
import { Repository } from 'typeorm';
import { DocAttachmentsEntity } from 'src/entities/docAttachments.entity';
export declare class PhotosService {
    private docAttachmentsRepository;
    private allowedMimeTypes;
    private maxFileSize;
    constructor(docAttachmentsRepository: Repository<DocAttachmentsEntity>);
    uploadFile(file: Express.Multer.File): Promise<{
        name: string;
        filename: string;
        size: number;
        mimetype: string;
        path: string;
        docId: number;
    }>;
    private validateFile;
    private generateCustomFilename;
    private getFilePath;
    private storeFile;
    saveFilePathToDatabase(file: Express.Multer.File, filePath: string): Promise<DocAttachmentsEntity>;
}
