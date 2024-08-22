import { Test, TestingModule } from '@nestjs/testing';
import { ReservationDocumentsController } from './reservation-documents.controller';

describe('ReservationDocumentsController', () => {
  let controller: ReservationDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationDocumentsController],
    }).compile();

    controller = module.get<ReservationDocumentsController>(ReservationDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
