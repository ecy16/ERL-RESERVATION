/// <reference types="multer" />
import { AddAttachmentDto } from 'src/dto/add-attachment.dto';
import { DocAttachmentsEntity } from 'src/entities/docAttachments.entity';
import { DataSource, Repository } from 'typeorm';
export declare class DocAttachmentsService {
    private attachmentRepo;
    private readonly attachDataSource;
    constructor(attachmentRepo: Repository<DocAttachmentsEntity>, attachDataSource: DataSource);
    createAttachment(addAttachmentDto: AddAttachmentDto): Promise<DocAttachmentsEntity>;
    findAllAttachments(): Promise<DocAttachmentsEntity[]>;
    findAttachmentById(id: number): Promise<DocAttachmentsEntity>;
    saveDocument(addAttachmentDto: AddAttachmentDto): Promise<DocAttachmentsEntity>;
    uploadFile(file: Express.Multer.File): Promise<string>;
}
