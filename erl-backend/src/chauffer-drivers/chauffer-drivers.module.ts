import { Module } from '@nestjs/common';
import { ChaufferDriversService } from './chauffer-drivers.service';
import { ChaufferDriversController } from './chauffer-drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaufferDriverEntity } from 'src/entities/chauffer-driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChaufferDriverEntity])],
  controllers: [ChaufferDriversController],
  providers: [ChaufferDriversService],
})
export class ChaufferDriversModule {


  
}
