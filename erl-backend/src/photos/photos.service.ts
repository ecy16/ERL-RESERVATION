import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';
import { extname, resolve } from 'path';
import { promises as fs } from 'fs';
import { DocAttachmentsEntity } from 'src/entities/docAttachments.entity';
import { MIMEType } from 'util';

@Injectable()
export class PhotosService {
  private  allowedMimeTypes = ['jpeg', 'png','pdf'];
  private  maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    @InjectRepository(DocAttachmentsEntity)
    private  docAttachmentsRepository: Repository<DocAttachmentsEntity>, // Inject the repository
  ) {}

  async uploadFile(file: Express.Multer.File) {
    // 1. Validation
    this.validateFile(file);

    // 2. Custom filename generation

    
    const customFilename = this.generateCustomFilename(file);

    // 3. File storage path
    const filePath = this.getFilePath(customFilename);

    // 4. Advanced storage logic
    await this.storeFile(file, filePath);

    // 5. Save file information in the database
    const savedFile = await this.saveFilePathToDatabase(file, filePath);

    // 6. Return relevant information
    return {
      name: file.originalname,
      filename: customFilename,
      size: file.size,
      mimetype: file.mimetype,
      path: filePath, 
      docId: savedFile.DocId, 
    };
  }

  private validateFile(file: Express.Multer.File) {
    if (this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type: ${file.mimetype}. Only JPEG and PNG are allowed.`);
    }
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(`File size exceeds the maximum allowed size of 5MB.`);
    }
  }

  private generateCustomFilename(file: Express.Multer.File): string {
    const timestamp = Date.now();
    const ext = extname(file.originalname);
    return `${timestamp}-${file.originalname}`;
  }

  private getFilePath(customFilename: string): string {
    return resolve(`./uploads/${customFilename}`);
  }

  private async storeFile(file: Express.Multer.File, filePath: string) {
    await fs.writeFile(filePath, file.buffer);
  }



   async saveFilePathToDatabase(file: Express.Multer.File, filePath: string) {
    const docAttachment = this.docAttachmentsRepository.create({
      DocName: file.originalname,
      DocPath: filePath,
      DocFolder: './uploads',
      CreatedBy: 'Admin', 
      CreatedOn: new Date(),
    });
    return await this.docAttachmentsRepository.save(docAttachment);
   }
}
