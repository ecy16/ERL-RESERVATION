import { Controller, Get, Param } from '@nestjs/common';
import { VehicleMasterService } from './vehicle-master.service';

@Controller('vehicle-master')
export class VehicleMasterController {
    constructor(private vehicleMasterService: VehicleMasterService) {}

    @Get('')
    fetchAllVehicleMakes() {
        return this.vehicleMasterService.fetchVehicleMakeAll();
    }

    @Get('/:Make')
    fetchVehicleModels(@Param('Make') Make: string) {
        return this.vehicleMasterService.fetchVehicleModel(Make);
    }
}
