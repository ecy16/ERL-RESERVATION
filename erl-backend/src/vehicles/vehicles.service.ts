import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclesEntity } from '../entities/vehicle.entity';
import { DataSource, Repository } from 'typeorm';
import { AddVehicleDto } from '../dto/add-vehicle.dto';
import { searchVehicleDto } from 'src/dto/searchVehicle.dto';
import { Observable, catchError, from } from 'rxjs';
import { constants } from 'fs/promises';
import * as csv from 'csvtojson';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(VehiclesEntity)
        private vehicleRepo: Repository<VehiclesEntity>,
        private vehicleDataSource: DataSource
    ) { }
    async fetchAllVehicles() {
        return await this.vehicleRepo.find();
    }

    async addVehicle(addVehicleDto: AddVehicleDto) {
        const vehicle = new VehiclesEntity(addVehicleDto);
        // this.reservationEntity.create(reservation);

        try {
            return await this.vehicleRepo.save(vehicle);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
    findOne(id: number) {
        return this.vehicleRepo.findOne({ where: { vehicleID: id } });
    }
    async fetchVehicleByModel(vehicleModel: string) {
        const vehicle = this.vehicleDataSource.createQueryRunner();
        await vehicle.connect();
        try {
            await vehicle.startTransaction();
            const vehicleInfo = await vehicle.query(
                `select  *from  _cplItemMaster m  
                where m.category_Name ='Make'`
            );
            await vehicle.commitTransaction();
            return vehicleInfo;
        } catch (e) {
            throw new Error(`Failed to find vehicles: ${e.message}`);
        }
    }



    async updateVehicle(id: number, attrs: Partial<VehiclesEntity>) {
        const vehicle = await this.findOne(id);
        if (!vehicle) {
            throw new NotFoundException('vehicle not found');
        }
        Object.assign(vehicle, attrs);
        return this.vehicleRepo.save(vehicle);
    }


    searchVehicles(searchVehicleDto: searchVehicleDto): Observable<VehiclesEntity[]> {
        const query = this.vehicleRepo.createQueryBuilder('vehicle');
        Object.keys(searchVehicleDto).forEach(key => {
            const value = searchVehicleDto[key];
            if (value) {
                query.andWhere(`vehicle.${key} = :${key}`, { [key]: value });
            }
        });

        return from(query.getMany()).pipe(
            catchError(error => {
                throw new Error(`Failed to find any results: ${error.message}`);
            })
        );
    }

    async importVehicles(file: any): Promise<string[]> {

        // const csvDocPath = process.cwd() + '/' + file.path;
        const batchSize = 500; // Start with a base batch size
        const maxParameters = 2100; // SQL Server max parameters
        const maxColumns = 20; // Number of columns in your vehicle table, adjust if needed

        // Calculate the maximum batch size based on the number of parameters
        const calculatedBatchSize = Math.floor(maxParameters / maxColumns);
        const finalBatchSize = Math.min(batchSize, calculatedBatchSize);

        var message;
        var vehicleArray;
        try {
            // vehicleArray = await csv().fromFile();
            console.log('Parsed Vehicle Array:', vehicleArray);

            // Adjust based on your needs
            var totalVehicles = vehicleArray.length

        } catch (error) {
            // console.error('Error reading CSV file:', error);
            throw new Error('Failed to read CSV file');
        }

        var savedVehicles;
        for (let i = 0; i < totalVehicles; i += finalBatchSize) {
            const batch = vehicleArray.slice(i, i + finalBatchSize);
            try {
                savedVehicles = await this.vehicleRepo.save(batch);
                // console.log('Vehicles saved successfully:', savedVehicles);
                message = 'Vehicles saved successfully';
            } catch (error) {
                // console.error('Error saving vehicles:', error); // Log the error here
                savedVehicles = null;
                message = error;
            }
            return savedVehicles;
        }
    }
}
