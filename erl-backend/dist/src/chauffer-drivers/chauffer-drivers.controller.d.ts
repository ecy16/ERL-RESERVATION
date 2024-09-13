/// <reference types="multer" />
import { ChaufferDriversService } from './chauffer-drivers.service';
import { UpdateChaufferDriverDto } from './dto/update-chauffer-driver.dto';
import { AddDriversDto } from 'src/dto/add-drivers.dto';
export declare class ChaufferDriversController {
    private readonly chaufferDriversService;
    constructor(chaufferDriversService: ChaufferDriversService);
    getAllChauffers(): Promise<import("src/entities/chauffer-driver.entity").ChaufferDriverEntity[]>;
    addChaufferDriver(body: AddDriversDto): Promise<import("src/entities/chauffer-driver.entity").ChaufferDriverEntity>;
    getDriver(DriverFirstName: string): Promise<any>;
    getChaufferDrivers(id: string): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateChaufferDriverDto: UpdateChaufferDriverDto): string;
    remove(id: string): string;
    searchChauffer(Body: any): import("rxjs").Observable<import("src/entities/chauffer-driver.entity").ChaufferDriverEntity[]>;
    uploadChaufferDataFile(file: Express.Multer.File): Promise<{
        message: string;
        data: (AddDriversDto & import("src/entities/chauffer-driver.entity").ChaufferDriverEntity)[];
    }>;
}
