"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocAttachmentsModule = void 0;
const common_1 = require("@nestjs/common");
const doc_attachments_controller_1 = require("./doc-attachments.controller");
const doc_attachments_service_1 = require("./doc-attachments.service");
const typeorm_1 = require("@nestjs/typeorm");
const docAttachments_entity_1 = require("../entities/docAttachments.entity");
let DocAttachmentsModule = class DocAttachmentsModule {
};
exports.DocAttachmentsModule = DocAttachmentsModule;
exports.DocAttachmentsModule = DocAttachmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([docAttachments_entity_1.DocAttachmentsEntity])],
        controllers: [doc_attachments_controller_1.DocAttachmentsController],
        providers: [doc_attachments_service_1.DocAttachmentsService],
    })
], DocAttachmentsModule);
//# sourceMappingURL=doc-attachments.module.js.map