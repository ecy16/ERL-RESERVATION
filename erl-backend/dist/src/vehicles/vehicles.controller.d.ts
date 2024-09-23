/// <reference types="multer" />
import { VehiclesService } from './vehicles.service';
import { AddVehicleDto } from '../dto/add-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehiclesEntity } from 'src/entities/vehicle.entity';
import { S3Service } from 'src/s3/s3.service';
export declare class VehiclesController {
    private vehicleService;
    private s3Service;
    constructor(vehicleService: VehiclesService, s3Service: S3Service);
    getAllVehicles(): Promise<VehiclesEntity[]>;
    addVehicle(files: {
        image?: Express.Multer.File[];
        document?: Express.Multer.File[];
    }, addVehicleDto: AddVehicleDto): Promise<VehiclesEntity>;
    findVehicle(id: string): Promise<VehiclesEntity>;
    getVehicle(vehicleModel: string): Promise<any>;
    updateVehicle(id: string, body: UpdateVehicleDto): Promise<VehiclesEntity>;
    uploadFile(file: any): Promise<any>;
    searchValue(Body: any): import("rxjs").Observable<VehiclesEntity[]>;
    uploadCsv(file: any): void;
}
