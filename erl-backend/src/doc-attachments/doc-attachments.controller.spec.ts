import { Test, TestingModule } from '@nestjs/testing';
import { DocAttachmentsController } from './doc-attachments.controller';

describe('DocAttachmentsController', () => {
    let controller: DocAttachmentsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DocAttachmentsController],
        }).compile();

        controller = module.get<DocAttachmentsController>(
            DocAttachmentsController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
