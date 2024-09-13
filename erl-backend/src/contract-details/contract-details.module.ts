import { Module } from '@nestjs/common';
import { ContractDetailsService } from './contract-details.service';
import { ContractDetailsController } from './contract-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractDetailEntity } from 'src/entities/contract-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractDetailEntity])],

  controllers: [ContractDetailsController],
  providers: [ContractDetailsService],
})
export class ContractDetailsModule {}
