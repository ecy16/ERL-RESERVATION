import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { DocAttachmentsEntity } from 'src/entities/docAttachments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocAttachmentsEntity]), 
  ],
  controllers: [PhotosController],
  providers: [PhotosService]

})
export class PhotosModule {}
