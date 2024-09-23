/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
}
