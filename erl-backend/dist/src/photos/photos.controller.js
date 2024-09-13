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
exports.PhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const photos_service_1 = require("./photos.service");
let PhotosController = class PhotosController {
    constructor(photosService) {
        this.photosService = photosService;
    }
    uploadSingle(file) {
        console.log(file, "backend file upload");
    }
    uploadMultiple(files) {
        console.log(files);
    }
    vehicle(file) {
        console.log(file, "backend file upload");
    }
    async uploadFiles(file) {
        const fileDetails = await this.photosService.uploadFile(file);
        return fileDetails;
    }
    async uploadFile1(file) {
        try {
            const result = await this.photosService.uploadFile(file);
            return {
                status: common_1.HttpStatus.OK,
                message: 'File uploaded successfully',
                data: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    uploadResvFile(file) {
        return this.photosService.uploadFile(file);
    }
    async saveFilePathToDatabase(file) {
        try {
            const filePath = `./uploads/${file.filename}`;
            const savedAttachment = await this.photosService.saveFilePathToDatabase(file, filePath);
            return {
                message: 'File uploaded and saved successfully',
                attachment: savedAttachment,
            };
        }
        catch (error) {
            return {
                message: 'Failed to upload file',
                error: error.message,
            };
        }
    }
};
exports.PhotosController = PhotosController;
__decorate([
    (0, common_1.Post)('Files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', { dest: './uploads' })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Post)('uploads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('photos[]', 10, { dest: './uploads' })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "uploadMultiple", null);
__decorate([
    (0, common_1.Post)('vehicle'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photos', { dest: './uploads/vehiclesDocs' })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "vehicle", null);
__decorate([
    (0, common_1.Post)('uploads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('files')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "uploadFile1", null);
__decorate([
    (0, common_1.Post)('UploadFile'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "uploadResvFile", null);
__decorate([
    (0, common_1.Post)('uploadFilePath'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "saveFilePathToDatabase", null);
exports.PhotosController = PhotosController = __decorate([
    (0, common_1.Controller)('photos'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotosController);
//# sourceMappingURL=photos.controller.js.map