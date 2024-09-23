import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesEntity } from '../entities/vehicle.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
    imports: [TypeOrmModule.forFeature([VehiclesEntity]),S3Module],
    controllers: [VehiclesController],
    providers: [VehiclesService],
})
export class VehiclesModule {
    
}
