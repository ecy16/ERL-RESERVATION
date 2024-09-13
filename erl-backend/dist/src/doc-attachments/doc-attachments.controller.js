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
exports.DocAttachmentsController = void 0;
const common_1 = require("@nestjs/common");
const doc_attachments_service_1 = require("./doc-attachments.service");
const add_attachment_dto_1 = require("../dto/add-attachment.dto");
let DocAttachmentsController = class DocAttachmentsController {
    constructor(attachmentService) {
        this.attachmentService = attachmentService;
    }
    fetchAttachment(id) {
        return this.attachmentService.findAttachmentById(parseInt(id));
    }
    fetchAllAttachments() {
        return this.attachmentService.findAllAttachments();
    }
    addNewAttachment(body) {
        return this.attachmentService.createAttachment(body);
    }
    addNewVehicleAttachment(body) {
        return this.attachmentService.createAttachment(body);
    }
};
exports.DocAttachmentsController = DocAttachmentsController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocAttachmentsController.prototype, "fetchAttachment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocAttachmentsController.prototype, "fetchAllAttachments", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_attachment_dto_1.AddAttachmentDto]),
    __metadata("design:returntype", void 0)
], DocAttachmentsController.prototype, "addNewAttachment", null);
__decorate([
    (0, common_1.Post)('vehicle/attach'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_attachment_dto_1.AddAttachmentDto]),
    __metadata("design:returntype", void 0)
], DocAttachmentsController.prototype, "addNewVehicleAttachment", null);
exports.DocAttachmentsController = DocAttachmentsController = __decorate([
    (0, common_1.Controller)('doc-attachments'),
    __metadata("design:paramtypes", [doc_attachments_service_1.DocAttachmentsService])
], DocAttachmentsController);
//# sourceMappingURL=doc-attachments.controller.js.map