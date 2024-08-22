import { Test, TestingModule } from '@nestjs/testing';
import { SelfDriversController } from './self-drivers.controller';

describe('SelfDriversController', () => {
    let controller: SelfDriversController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SelfDriversController],
        }).compile();

        controller = module.get<SelfDriversController>(SelfDriversController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
