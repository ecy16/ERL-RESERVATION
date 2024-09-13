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
exports.DocAttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const docAttachments_entity_1 = require("../entities/docAttachments.entity");
const typeorm_2 = require("typeorm");
let DocAttachmentsService = class DocAttachmentsService {
    constructor(attachmentRepo, attachDataSource) {
        this.attachmentRepo = attachmentRepo;
        this.attachDataSource = attachDataSource;
    }
    async createAttachment(addAttachmentDto) {
        const attachment = new docAttachments_entity_1.DocAttachmentsEntity(addAttachmentDto);
        try {
            return await this.attachmentRepo.save(attachment);
        }
        catch (error) {
            throw new Error(`SOMETHING WENT WRONG: ${error.message}`);
        }
    }
    async findAllAttachments() {
        try {
            return await this.attachmentRepo.find();
        }
        catch (error) {
            throw new Error(`SOMETHING WENT WRONG: ${error.message}`);
        }
    }
    async findAttachmentById(id) {
        try {
            return this.attachmentRepo.findOne({ where: { DocId: id } });
        }
        catch (error) {
            throw new Error(`SOMETHING WENT WRONG: ${error.message}`);
        }
    }
    async saveDocument(addAttachmentDto) {
        const newDoc = this.attachmentRepo.create(addAttachmentDto);
        return this.attachmentRepo.save(newDoc);
    }
    async uploadFile(file) {
        const filePath = `uploads/${file.filename}`;
        return filePath;
    }
};
exports.DocAttachmentsService = DocAttachmentsService;
exports.DocAttachmentsService = DocAttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docAttachments_entity_1.DocAttachmentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], DocAttachmentsService);
//# sourceMappingURL=doc-attachments.service.js.map