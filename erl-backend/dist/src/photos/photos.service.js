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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const path_1 = require("path");
const fs_1 = require("fs");
const docAttachments_entity_1 = require("../entities/docAttachments.entity");
let PhotosService = class PhotosService {
    constructor(docAttachmentsRepository) {
        this.docAttachmentsRepository = docAttachmentsRepository;
        this.allowedMimeTypes = ['jpeg', 'png', 'pdf'];
        this.maxFileSize = 5 * 1024 * 1024;
    }
    async uploadFile(file) {
        this.validateFile(file);
        const customFilename = this.generateCustomFilename(file);
        const filePath = this.getFilePath(customFilename);
        await this.storeFile(file, filePath);
        const savedFile = await this.saveFilePathToDatabase(file, filePath);
        return {
            name: file.originalname,
            filename: customFilename,
            size: file.size,
            mimetype: file.mimetype,
            path: filePath,
            docId: savedFile.DocId,
        };
    }
    validateFile(file) {
        if (file.size > this.maxFileSize) {
            throw new common_1.BadRequestException(`File size exceeds the maximum allowed size of 5MB.`);
        }
    }
    generateCustomFilename(file) {
        const timestamp = Date.now();
        const ext = (0, path_1.extname)(file.originalname);
        return `${timestamp}-${file.originalname}`;
    }
    getFilePath(customFilename) {
        return (0, path_1.resolve)(`./uploads/${customFilename}`);
    }
    async storeFile(file, filePath) {
        await fs_1.promises.writeFile(filePath, file.buffer);
    }
    async saveFilePathToDatabase(file, filePath) {
        const docAttachment = this.docAttachmentsRepository.create({
            DocName: file.originalname,
            DocPath: filePath,
            DocFolder: './uploads',
            CreatedBy: 'Admin',
            CreatedOn: new Date(),
        });
        return await this.docAttachmentsRepository.save(docAttachment);
    }
};
exports.PhotosService = PhotosService;
exports.PhotosService = PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docAttachments_entity_1.DocAttachmentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotosService);
//# sourceMappingURL=photos.service.js.map