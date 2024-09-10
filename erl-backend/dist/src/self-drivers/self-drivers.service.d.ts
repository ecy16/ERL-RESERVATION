/// <reference types="multer" />
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SelfDriversEntity } from '../entities/selfDrivers.entity';
import { AddSelfDriversDto } from '../dto/add-selfDrivers.dto';
export declare class SelfDriversService {
    private selfDriversRepo;
    private readonly selfDriversEntity;
    private readonly selfDriversDataSource;
    constructor(selfDriversRepo: Repository<SelfDriversEntity>, selfDriversEntity: EntityManager, selfDriversDataSource: DataSource);
    createSelfDriver(addSelfDriversDto: AddSelfDriversDto): Promise<SelfDriversEntity>;
    findAllSelfDrivers(): Promise<SelfDriversEntity[]>;
    findRelatedSelfDrivers(id: number): Promise<SelfDriversEntity[]>;
    findSelfDriver(id: number): Promise<SelfDriversEntity>;
    updateSelfDriver(id: number, attrs: Partial<SelfDriversEntity>): Promise<SelfDriversEntity>;
    uploadFile(file: Express.Multer.File): Promise<string>;
}
