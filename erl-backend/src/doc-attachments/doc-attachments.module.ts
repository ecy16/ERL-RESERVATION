import { Module } from '@nestjs/common';
import { DocAttachmentsController } from './doc-attachments.controller';
import { DocAttachmentsService } from './doc-attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocAttachmentsEntity } from 'src/entities/docAttachments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DocAttachmentsEntity])],
    controllers: [DocAttachmentsController],
    providers: [DocAttachmentsService],
})
export class DocAttachmentsModule {}
