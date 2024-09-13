import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddAttachmentDto } from 'src/dto/add-attachment.dto';
import { DocAttachmentsEntity } from 'src/entities/docAttachments.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DocAttachmentsService {
    constructor(
        @InjectRepository(DocAttachmentsEntity)
        private attachmentRepo: Repository<DocAttachmentsEntity>,
        private readonly attachDataSource: DataSource,
    ) {}

    async createAttachment(addAttachmentDto: AddAttachmentDto) {
        const attachment = new DocAttachmentsEntity(addAttachmentDto);

        try {
            return await this.attachmentRepo.save(attachment);
        } catch (error) {
            throw new Error(`SOMETHING WENT WRONG: ${error.message}`);
        }
    }
    async findAllAttachments() {
        try {
            return await this.attachmentRepo.find();
        } catch (error) {
            throw new Error(`SOMETHING WENT WRONG: ${error.message}`);
        }
    }
    async findAttachmentById(id: number) {
        try {
            return this.attachmentRepo.findOne({ where: { DocId: id } });
        } catch (error) {
            throw new Error(`SOMETHING WENT WRONG: ${error.message}`);
        }
    }


async saveDocument(addAttachmentDto:AddAttachmentDto):Promise<DocAttachmentsEntity>{
    const newDoc = this.attachmentRepo.create(addAttachmentDto)
    return this.attachmentRepo.save(newDoc)
}


async uploadFile(file:Express.Multer.File):Promise<string>{
    const filePath =`uploads/${file.filename}`;
    return filePath
}
    
}
