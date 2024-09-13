import { Test, TestingModule } from '@nestjs/testing';
import { VehicleMasterController } from './vehicle-master.controller';

describe('VehicleMasterController', () => {
    let controller: VehicleMasterController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehicleMasterController],
        }).compile();

        controller = module.get<VehicleMasterController>(
            VehicleMasterController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
