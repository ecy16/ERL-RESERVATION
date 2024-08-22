import { Test, TestingModule } from '@nestjs/testing';
import { SelfDriversService } from './self-drivers.service';

describe('SelfDriversService', () => {
    let service: SelfDriversService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SelfDriversService],
        }).compile();

        service = module.get<SelfDriversService>(SelfDriversService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
