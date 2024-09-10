import { SelfDriversService } from './self-drivers.service';
import { AddSelfDriversDto } from '../dto/add-selfDrivers.dto';
import { UpdateSelfDriversDto } from '../dto/update-selfDrivers.dto';
export declare class SelfDriversController {
    private selfDriversService;
    constructor(selfDriversService: SelfDriversService);
    fetchSelfDriver(id: string): Promise<import("../entities/selfDrivers.entity").SelfDriversEntity>;
    fetchRelatedSelfDriver(id: string): Promise<import("../entities/selfDrivers.entity").SelfDriversEntity[]>;
    fetchAllSelfDrivers(): Promise<import("../entities/selfDrivers.entity").SelfDriversEntity[]>;
    addNewSelfDriver(body: AddSelfDriversDto): Promise<import("../entities/selfDrivers.entity").SelfDriversEntity>;
    updateSelfDriver(id: string, body: UpdateSelfDriversDto): Promise<import("../entities/selfDrivers.entity").SelfDriversEntity>;
}
