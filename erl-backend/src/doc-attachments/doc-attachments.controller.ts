import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { DocAttachmentsService } from './doc-attachments.service';
import { AddAttachmentDto } from 'src/dto/add-attachment.dto';

@Controller('doc-attachments')
export class DocAttachmentsController {
    constructor(private attachmentService: DocAttachmentsService) {}

    @Get('/:id')
    fetchAttachment(@Param('id') id: string) {
        return this.attachmentService.findAttachmentById(parseInt(id));
    }

    @Get()
    fetchAllAttachments() {
        return this.attachmentService.findAllAttachments();
    }

    @Post('/create')
    addNewAttachment(@Body(ValidationPipe) body: AddAttachmentDto) {
        return this.attachmentService.createAttachment(body);
    }

    @Post('vehicle/attach')
    addNewVehicleAttachment(@Body(ValidationPipe) body: AddAttachmentDto) {
        return this.attachmentService.createAttachment(body);
    }
}
