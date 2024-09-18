import { VehicleMasterService } from './vehicle-master.service';
export declare class VehicleMasterController {
    private vehicleMasterService;
    constructor(vehicleMasterService: VehicleMasterService);
    fetchAllVehicleMakes(): Promise<any>;
    fetchVehicleModels(Make: string): Promise<any>;
    fetchVehicleType(Model: string): Promise<string>;
}
