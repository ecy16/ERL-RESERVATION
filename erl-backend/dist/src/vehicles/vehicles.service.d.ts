/// <reference types="multer" />
import { VehiclesEntity } from '../entities/vehicle.entity';
import { DataSource, Repository } from 'typeorm';
import { AddVehicleDto } from '../dto/add-vehicle.dto';
import { searchVehicleDto } from 'src/dto/searchVehicle.dto';
import { Observable } from 'rxjs';
import { S3Service } from 'src/s3/s3.service';
export declare class VehiclesService {
    private vehicleRepo;
    private vehicleDataSource;
    private s3Service;
    constructor(vehicleRepo: Repository<VehiclesEntity>, vehicleDataSource: DataSource, s3Service: S3Service);
    fetchAllVehicles(): Promise<VehiclesEntity[]>;
    addVehicle(addVehicleDto: AddVehicleDto, files: {
        image?: Express.Multer.File[];
        document?: Express.Multer.File[];
    }): Promise<VehiclesEntity>;
    findOne(id: number): Promise<VehiclesEntity>;
    fetchVehicleByModel(vehicleModel: string): Promise<any>;
    updateVehicle(id: number, attrs: Partial<VehiclesEntity>): Promise<VehiclesEntity>;
    searchVehicles(searchVehicleDto: searchVehicleDto): Observable<VehiclesEntity[]>;
    importVehicles(file: any): Promise<string[]>;
}
