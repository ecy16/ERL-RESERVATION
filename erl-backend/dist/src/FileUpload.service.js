"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicleAttachments_entity_1 = require("./entities/vehicleAttachments.entity");
const docAttachments_entity_1 = require("./entities/docAttachments.entity");
let FileUploadService = class FileUploadService {
    constructor(vehicleAttachmentsRepo, docAttachmentsRepo) {
        this.vehicleAttachmentsRepo = vehicleAttachmentsRepo;
        this.docAttachmentsRepo = docAttachmentsRepo;
    }
    async saveAttachment(VehicleId, file, createdBy) {
        const docAttachment = this.docAttachmentsRepo.create({
            DocPath: file.path,
            DocFolder: 'some/folder',
            DocName: file.originalname,
            CreatedBy: createdBy,
        });
        const savedDocAttachment = await this.docAttachmentsRepo.save(docAttachment);
        const vehicleAttachment = this.vehicleAttachmentsRepo.create({
            VehicleId: VehicleId,
            DocId: savedDocAttachment.DocId,
            CreatedBy: createdBy,
        });
        return this.vehicleAttachmentsRepo.save(vehicleAttachment);
    }
    async getFilePathByAttachmentId(attachmentId) {
        const vehicleAttachment = await this.vehicleAttachmentsRepo.findOne({
            where: { AttachmentId: attachmentId },
        });
        if (!vehicleAttachment) {
            throw new Error('Attachment not found');
        }
        const docAttachment = await this.docAttachmentsRepo.findOne({
            where: { DocId: vehicleAttachment.DocId },
        });
        if (!docAttachment) {
            throw new Error('Document not found');
        }
        return docAttachment.DocPath;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicleAttachments_entity_1.VehicleAttachmentsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(docAttachments_entity_1.DocAttachmentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FileUploadService);
//# sourceMappingURL=FileUpload.service.js.map