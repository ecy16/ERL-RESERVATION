import { Test, TestingModule } from '@nestjs/testing';
import { TripsServicesController } from './trips-services.controller';

describe('TripsServicesController', () => {
    let controller: TripsServicesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TripsServicesController],
        }).compile();

        controller = module.get<TripsServicesController>(
            TripsServicesController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
