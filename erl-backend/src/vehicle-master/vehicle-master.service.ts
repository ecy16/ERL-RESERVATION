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
    async fetchVehicleType(Model: string) {
        const fetchModel = await this.dataSource.createQueryRunner();
        await fetchModel.connect();
        try {
            await fetchModel.startTransaction();
            const vehicleModel = await fetchModel.query(
                `select *from _cplItemMaster where category_Name='Type' and item_Name='Vehicle'`,
                ['Vehicle', 'Model', Model],
            );
            await fetchModel.commitTransaction();
            return vehicleModel;
        } catch (e) {
            throw new Error(`Failed to fetch models for make: ${e.message}`);
        }
    }
}
