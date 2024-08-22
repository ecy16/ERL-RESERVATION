import { Test, TestingModule } from '@nestjs/testing';
import { ReservationDocumentsService } from './reservation-documents.service';

describe('ReservationDocumentsService', () => {
  let service: ReservationDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationDocumentsService],
    }).compile();

    service = module.get<ReservationDocumentsService>(ReservationDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
