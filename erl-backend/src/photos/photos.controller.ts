import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, HttpException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('Files')
  @UseInterceptors(FileInterceptor('photo', { dest: './uploads' }))
  uploadSingle(@UploadedFile() file) {
    console.log(file, "backend file upload");
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('photos[]', 10, { dest: './uploads' }))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
@Post('vehicle')
@UseInterceptors(FileInterceptor('photos',{dest:'./uploads/vehiclesDocs'}))

vehicle(@UploadedFile() file) {
  console.log(file, "backend file upload");
}

// @Post('Files')
// @UseInterceptors(FileInterceptor('files'))
// uploadFile(@UploadedFile() file) {
//   console.log(file, "new backend file upload");
// }

@Post('uploads')
@UseInterceptors(FileInterceptor('files'))
async uploadFiles(@UploadedFile() file: Express.Multer.File) {
  const fileDetails = await this.photosService.uploadFile(file);
  return fileDetails;
}


@Post('upload')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadFile1(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.photosService.uploadFile(file);
      return {
        status: HttpStatus.OK,
        message: 'File uploaded successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('UploadFile')
uploadResvFile(@UploadedFile() file: Express.Multer.File){
  return this.photosService.uploadFile(file)
}

@Post('uploadFilePath')
  // @UseInterceptors(FileInterceptor('file'))
  async saveFilePathToDatabase(@UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      const filePath = `./uploads/${file.filename}`; // Construct the file path
      const savedAttachment = await this.photosService.saveFilePathToDatabase(file, filePath);

      return {
        message: 'File uploaded and saved successfully',
        attachment: savedAttachment,
      };
    } catch (error) {
      return {
        message: 'Failed to upload file',
        error: error.message,
      };
    }
  }

}
