import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus, Body } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './FileUpload.service';

@Controller('files')
export class FileUploadController {
    constructor(private fileUploadService:FileUploadService) {}

    // @Post('upload')
    // // @UseInterceptors(FileInterceptor('file')) 
    // async uploadFile(
    //     @UploadedFile() file: Express.Multer.File,
    //     @Body('vehicleId') VehicleId: number,
    //     @Body('createdBy') createdBy: string
    // ) {
    //     if (!file) {
    //         throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    //     }

    //     try {
    //         const attachment = await this.fileUploadService.saveAttachment(VehicleId, file, createdBy);
    //         return { message: 'File uploaded successfully', attachment };
    //     } catch (error) {
    //         throw new HttpException('File upload failed', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
