import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { AddVehicleDto } from '../dto/add-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage, memoryStorage } from 'multer';
import * as moment from "moment";
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { VehiclesEntity } from 'src/entities/vehicle.entity';
import { S3Service } from 'src/s3/s3.service';

@Controller('vehicles')
export class VehiclesController {
    //inject a service
    constructor(private vehicleService: VehiclesService, private s3Service: S3Service,) { }
    @Get()
    getAllVehicles() {
        return this.vehicleService.fetchAllVehicles();
    }

    // @Post('/uploadFile')
    // @UseInterceptors(FileInterceptor("pdf", {
    //     storage: diskStorage({
    //         destination: './vehicleFiles',
    //         filename: (req, file, cb) => {
    //             const randomName = 'Vehicle_Importation_File'+moment()
    //             .format("DDMMYYYY_HHmmss")
    //             cb(null, `${randomName}${extname(file.originalname)}`)
    //         }
    //     })
    // }))

    @Post('/create')
@ApiConsumes('multipart/form-data')
@ApiBody({ type: AddVehicleDto })
@UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
], {
    storage: memoryStorage(), // Use memory storage to get the buffer
}))
async addVehicle(@UploadedFiles() files: { image?: Express.Multer.File[], document?: Express.Multer.File[] }, @Body() addVehicleDto: AddVehicleDto) {
    let imageUrl = null;
    let documentUrl = null;

  
    if (files.image && files.image.length > 0) {
        imageUrl = await this.s3Service.uploadFile(files.image[0], 'vehicles');
    }

   
    if (files.document && files.document.length > 0) {
        documentUrl = await this.s3Service.uploadFile(files.document[0], 'documents');
    }

    const vehicle = new VehiclesEntity({
        ...addVehicleDto,
        image: imageUrl,
        document: documentUrl,
    });

    try {
        
        return await this.vehicleService.addVehicle(addVehicleDto, { image: files.image, document: files.document });
    } catch (err) {
        throw new BadRequestException(err);
    }
}


    @Get('/:id')
    findVehicle(@Param('id') id: string) {
        return this.vehicleService.findOne(parseInt(id));
    }
    @Get('vehicle/:vehicleModel')
    getVehicle(@Param('vehicleModel') vehicleModel: string) {
        return this.vehicleService.fetchVehicleByModel(vehicleModel)

    }

    @Patch('/:id')
    updateVehicle(@Param('id') id: string, @Body() body: UpdateVehicleDto) {
        return this.vehicleService.updateVehicle(parseInt(id), body);
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@UploadedFile() file) {
        return file;
    }
    @Post('search')
    searchValue(@Body() Body: any) {
        return this.vehicleService.searchVehicles(Body)
    }

    @Post('/uploadBatch')
    @UseInterceptors(FileInterceptor("csv", {
        storage: diskStorage({
            destination: './csv',
            filename: (req, file, cb) => {
                const randomName = 'Vehicle_Importation_File' + moment()
                    .format("DDMMYYYY_HHmmss")
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    uploadCsv(@UploadedFile() file) {
        this.vehicleService.importVehicles(file);
    }



}
