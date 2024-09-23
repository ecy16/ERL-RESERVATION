import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
    private s3: S3;

    constructor(private configService: ConfigService) {
        this.s3 = new S3({
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }

    async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
       
        if (!file || !file.buffer) {
            throw new Error('File buffer is required for upload');
        }

        const params = {
            Bucket: this.configService.get('S3_BUCKET_NAME'),
            Key: `${folder}/${file.originalname}`, 
            Body:file.buffer,
            ContentType: file.mimetype,            
        };

        

        const data = await this.s3.upload(params).promise();
        return data.Location;
    }



}
