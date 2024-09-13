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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocAttachmentsEntity = void 0;
const typeorm_1 = require("typeorm");
let DocAttachmentsEntity = class DocAttachmentsEntity {
    constructor(attachments) {
        Object.assign(this, attachments);
    }
};
exports.DocAttachmentsEntity = DocAttachmentsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocAttachmentsEntity.prototype, "DocId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocAttachmentsEntity.prototype, "DocPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocAttachmentsEntity.prototype, "DocFolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocAttachmentsEntity.prototype, "DocName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocAttachmentsEntity.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], DocAttachmentsEntity.prototype, "CreatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocAttachmentsEntity.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocAttachmentsEntity.prototype, "ModifiedOn", void 0);
exports.DocAttachmentsEntity = DocAttachmentsEntity = __decorate([
    (0, typeorm_1.Entity)('_cplDocAttachments'),
    __metadata("design:paramtypes", [Object])
], DocAttachmentsEntity);
//# sourceMappingURL=docAttachments.entity.js.map