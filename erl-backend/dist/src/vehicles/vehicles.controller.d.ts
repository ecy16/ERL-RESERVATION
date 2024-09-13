import { VehiclesService } from './vehicles.service';
import { AddVehicleDto } from '../dto/add-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
export declare class VehiclesController {
    private vehicleService;
    constructor(vehicleService: VehiclesService);
    getAllVehicles(): Promise<import("../entities/vehicle.entity").VehiclesEntity[]>;
    addNewVehicle(body: AddVehicleDto): Promise<import("../entities/vehicle.entity").VehiclesEntity>;
    findVehicle(id: string): Promise<import("../entities/vehicle.entity").VehiclesEntity>;
    getVehicle(vehicleModel: string): Promise<any>;
    updateVehicle(id: string, body: UpdateVehicleDto): Promise<import("../entities/vehicle.entity").VehiclesEntity>;
    uploadFile(file: any): Promise<any>;
    searchValue(Body: any): import("rxjs").Observable<import("../entities/vehicle.entity").VehiclesEntity[]>;
    uploadCsv(file: any): void;
}
