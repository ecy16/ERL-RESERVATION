import { DocAttachmentsService } from './doc-attachments.service';
import { AddAttachmentDto } from 'src/dto/add-attachment.dto';
export declare class DocAttachmentsController {
    private attachmentService;
    constructor(attachmentService: DocAttachmentsService);
    fetchAttachment(id: string): Promise<import("src/entities/docAttachments.entity").DocAttachmentsEntity>;
    fetchAllAttachments(): Promise<import("src/entities/docAttachments.entity").DocAttachmentsEntity[]>;
    addNewAttachment(body: AddAttachmentDto): Promise<import("src/entities/docAttachments.entity").DocAttachmentsEntity>;
    addNewVehicleAttachment(body: AddAttachmentDto): Promise<import("src/entities/docAttachments.entity").DocAttachmentsEntity>;
}
