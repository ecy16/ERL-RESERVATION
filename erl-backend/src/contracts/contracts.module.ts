import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { ContractEntity } from 'src/entities/contract.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],

  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
