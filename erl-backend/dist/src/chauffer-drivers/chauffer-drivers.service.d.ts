import { CreateChaufferDriverDto } from './dto/create-chauffer-driver.dto';
import { UpdateChaufferDriverDto } from './dto/update-chauffer-driver.dto';
import { DataSource, Repository } from 'typeorm';
import { ChaufferDriverEntity } from 'src/entities/chauffer-driver.entity';
import { AddDriversDto } from 'src/dto/add-drivers.dto';
import { SearchDriversDto } from 'src/dto/searchDrivers.dto';
import { Observable } from 'rxjs';
export declare class ChaufferDriversService {
    private chaufferRepo;
    private readonly chaufferDriversDataSource;
    constructor(chaufferRepo: Repository<ChaufferDriverEntity>, chaufferDriversDataSource: DataSource);
    fetchAllChauffers(): Promise<ChaufferDriverEntity[]>;
    create(createChaufferDriverDto: CreateChaufferDriverDto): string;
    getChaufferDrivers(id: number): Promise<any>;
    addChauffer(addDriversDto: AddDriversDto): Promise<ChaufferDriverEntity>;
    fetchChaufferById(DriverFirstName: any): Promise<any>;
    searchView(searchDriversDto: SearchDriversDto): Observable<ChaufferDriverEntity[]>;
    findOne(id: number): string;
    update(id: number, updateChaufferDriverDto: UpdateChaufferDriverDto): string;
    remove(id: number): string;
}
