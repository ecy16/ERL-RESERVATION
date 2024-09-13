import { Controller, Get, Param,Post } from '@nestjs/common';
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

  @Get('Types/:Model')
  fetchVehicleType(@Param('Model') Model: string) {
    return this.vehicleMasterService.fetchVehicleType(Model);
  }
    
}
