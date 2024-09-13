import { Test, TestingModule } from '@nestjs/testing';
import { ContractDetailsController } from './contract-details.controller';
import { ContractDetailsService } from './contract-details.service';

describe('ContractDetailsController', () => {
  let controller: ContractDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractDetailsController],
      providers: [ContractDetailsService],
    }).compile();

    controller = module.get<ContractDetailsController>(ContractDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
