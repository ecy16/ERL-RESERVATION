import { Module } from '@nestjs/common';
import { VehicleMasterController } from './vehicle-master.controller';
import { VehicleMasterService } from './vehicle-master.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemMasterEntity } from '../entities/itemMaster.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ItemMasterEntity])],
    controllers: [VehicleMasterController],
    providers: [VehicleMasterService],
})
export class VehicleMasterModule {}
