import { VehiclesEntity } from '../entities/vehicle.entity';
import { DataSource, Repository } from 'typeorm';
import { AddVehicleDto } from '../dto/add-vehicle.dto';
import { searchVehicleDto } from 'src/dto/searchVehicle.dto';
import { Observable } from 'rxjs';
export declare class VehiclesService {
    private vehicleRepo;
    private vehicleDataSource;
    constructor(vehicleRepo: Repository<VehiclesEntity>, vehicleDataSource: DataSource);
    fetchAllVehicles(): Promise<VehiclesEntity[]>;
    addVehicle(addVehicleDto: AddVehicleDto): Promise<VehiclesEntity>;
    findOne(id: number): Promise<VehiclesEntity>;
    fetchVehicleByModel(vehicleModel: string): Promise<any>;
    updateVehicle(id: number, attrs: Partial<VehiclesEntity>): Promise<VehiclesEntity>;
    searchVehicles(searchVehicleDto: searchVehicleDto): Observable<VehiclesEntity[]>;
    importVehicles(file: any): Promise<string[]>;
}
