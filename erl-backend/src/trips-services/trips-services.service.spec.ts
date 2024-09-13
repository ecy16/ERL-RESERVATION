import { Test, TestingModule } from '@nestjs/testing';
import { TripsServicesService } from './trips-services.service';

describe('TripsServicesService', () => {
    let service: TripsServicesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TripsServicesService],
        }).compile();

        service = module.get<TripsServicesService>(TripsServicesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
