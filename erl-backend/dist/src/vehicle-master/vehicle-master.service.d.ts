import { DataSource } from 'typeorm';
export declare class VehicleMasterService {
    private dataSource;
    constructor(dataSource: DataSource);
    fetchVehicleMake(): Promise<any>;
    fetchVehicleMakeAll(): Promise<any>;
    fetchVehicleModel(Make: string): Promise<any>;
    fetchVehicleType(Model: string): Promise<string>;
}
