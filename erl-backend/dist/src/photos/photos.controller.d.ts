/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { PhotosService } from './photos.service';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    uploadSingle(file: any): void;
    uploadMultiple(files: any): void;
    vehicle(file: any): void;
    uploadFiles(file: Express.Multer.File): Promise<{
        name: string;
        filename: string;
        size: number;
        mimetype: string;
        path: string;
        docId: number;
    }>;
    uploadFile1(file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            name: string;
            filename: string;
            size: number;
            mimetype: string;
            path: string;
            docId: number;
        };
    }>;
    uploadResvFile(file: Express.Multer.File): Promise<{
        name: string;
        filename: string;
        size: number;
        mimetype: string;
        path: string;
        docId: number;
    }>;
    saveFilePathToDatabase(file: Express.Multer.File): Promise<any>;
}
