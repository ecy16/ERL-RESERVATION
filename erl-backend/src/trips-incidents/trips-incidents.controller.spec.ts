import { Test, TestingModule } from '@nestjs/testing';
import { TripsIncidentsController } from './trips-incidents.controller';

describe('TripsIncidentsController', () => {
    let controller: TripsIncidentsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TripsIncidentsController],
        }).compile();

        controller = module.get<TripsIncidentsController>(
            TripsIncidentsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
