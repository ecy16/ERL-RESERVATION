import { Test, TestingModule } from '@nestjs/testing';
import { ChaufferDriversService } from './chauffer-drivers.service';

describe('ChaufferDriversService', () => {
  let service: ChaufferDriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChaufferDriversService],
    }).compile();

    service = module.get<ChaufferDriversService>(ChaufferDriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
