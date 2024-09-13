import { Test, TestingModule } from '@nestjs/testing';
import { TripsIncidentsService } from './trips-incidents.service';

describe('TripsIncidentsService', () => {
    let service: TripsIncidentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TripsIncidentsService],
        }).compile();

        service = module.get<TripsIncidentsService>(TripsIncidentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
