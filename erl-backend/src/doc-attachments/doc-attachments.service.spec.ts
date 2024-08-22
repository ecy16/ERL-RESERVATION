import { Test, TestingModule } from '@nestjs/testing';
import { DocAttachmentsService } from './doc-attachments.service';

describe('DocAttachmentsService', () => {
    let service: DocAttachmentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DocAttachmentsService],
        }).compile();

        service = module.get<DocAttachmentsService>(DocAttachmentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
