import { Test, TestingModule } from '@nestjs/testing';
import { VehicleMasterService } from './vehicle-master.service';

describe('VehicleMasterService', () => {
    let service: VehicleMasterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VehicleMasterService],
        }).compile();

        service = module.get<VehicleMasterService>(VehicleMasterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
