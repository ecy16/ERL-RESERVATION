import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class VehicleMasterService {
    constructor(private dataSource: DataSource) {}

    async fetchVehicleMake() {
        const fetchMake = await this.dataSource.createQueryRunner();
        await fetchMake.connect();
        try {
            await fetchMake.startTransaction();
            const vehicleMakes = await fetchMake.query(
                `select distinct category_Options from _cplItemMaster where item_Name=@0 and category_Name=@1`,
                ['Vehicle', 'Make'],
            );
            await fetchMake.commitTransaction();
            return vehicleMakes;
        } catch (e) {
            throw new Error(`Failed to fetch vehicle makes: ${e.message}`);
        }
    }
    async fetchVehicleMakeAll() {
        const fetchMake = await this.dataSource.createQueryRunner();
        await fetchMake.connect();
        try {
            await fetchMake.startTransaction();
            const vehicleMakes = await fetchMake.query(
                `select distinct category_Options from _cplItemMaster where category_Name='Make'`
            );
            await fetchMake.commitTransaction();
            return vehicleMakes;
        } catch (e) {
            throw new Error(`Failed to fetch vehicle makes: ${e.message}`);
        }
    }

    async fetchVehicleModel(Make: string) {
        const fetchModel = await this.dataSource.createQueryRunner();
        await fetchModel.connect();
        try {
            await fetchModel.startTransaction();
            const vehicleModel = await fetchModel.query(
                `select category_Options_1 from _cplItemMaster where item_Name=@0 and category_Name=@1 and category_Options=@2`,
                ['Vehicle', 'Make', Make],
            );
            await fetchModel.commitTransaction();

            return vehicleModel;
        } catch (e) {
            throw new Error(`Failed to fetch models for make: ${e.message}`);
        }
    }

    async fetchVehicleType(Model: string): Promise<string> {
    
        const fetchType = await this.dataSource.createQueryRunner();
        await fetchType.connect();
        try {
            await fetchType.startTransaction();
    
            // Query to fetch vehicle type
            const VehicleType = await fetchType.query(
                `select category_Options_2 from _cplItemMaster where item_Name='Vehicle' and category_Options_1=@0`,
                [Model]
            );

            await fetchType.commitTransaction();
            console.log('vehicleType:', VehicleType);
    
            // Assuming result is an array and we need the first entry
            return VehicleType
            // return VehicleType.length > 0 ? VehicleType[0].category_Options_2 : null;

        } catch (e) {
            throw new Error(`Failed to fetch vehicle type: ${e.message}`);
        } 
    }
    // async fetchVehicleType(Model: string): Promise<string> {
    //     console.log('vehicleModel:', Model);
    
    //     const fetchType = await this.dataSource.createQueryRunner();
    //     await fetchType.connect();
    //     try {
    //         await fetchType.startTransaction();
    
    //         // Query to fetch vehicle type
    //         const result = await fetchType.query(
    //             `select category_Options_2 from _cplItemMaster where item_Name='Vehicle' and category_Options_1=@0`,
    //             [Model]
    //         );
    //         console.log('vehicleModel2:', Model);

    //         await fetchType.commitTransaction();
    //         console.log('vehicleType:', result);
    
    //         // Assuming result is an array and we need the first entry
    //         return result.length > 0 ? result[0].category_Options_2 : null;

    //     } catch (e) {
    //         console.log('vehicleModel:4', fetchType);

    //         await fetchType.rollbackTransaction();
    //         throw new Error(`Failed to fetch vehicle type: ${e.message}`);
    //     } finally {
    //         await fetchType.release();
    //     }
    }
    

