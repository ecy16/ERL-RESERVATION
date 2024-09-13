import { Test, TestingModule } from '@nestjs/testing';
import { ChaufferDriversController } from './chauffer-drivers.controller';
import { ChaufferDriversService } from './chauffer-drivers.service';

describe('ChaufferDriversController', () => {
  let controller: ChaufferDriversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaufferDriversController],
      providers: [ChaufferDriversService],
    }).compile();

    controller = module.get<ChaufferDriversController>(ChaufferDriversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
