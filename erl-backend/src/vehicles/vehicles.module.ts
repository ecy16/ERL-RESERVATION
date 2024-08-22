import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesEntity } from '../entities/vehicle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VehiclesEntity])],
    controllers: [VehiclesController],
    providers: [VehiclesService],
})
export class VehiclesModule {
    
}
