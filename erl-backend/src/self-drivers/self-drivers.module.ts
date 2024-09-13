import { Module } from '@nestjs/common';
import { SelfDriversController } from './self-drivers.controller';
import { SelfDriversService } from './self-drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelfDriversEntity } from '../entities/selfDrivers.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SelfDriversEntity])],
    controllers: [SelfDriversController],
    providers: [SelfDriversService],
})
export class SelfDriversModule {}
