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
exports.ChaufDriveDocs = void 0;
const typeorm_1 = require("typeorm");
const docAttachments_entity_1 = require("./docAttachments.entity");
let ChaufDriveDocs = class ChaufDriveDocs {
};
exports.ChaufDriveDocs = ChaufDriveDocs;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChaufDriveDocs.prototype, "ChaufDriveDocId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => docAttachments_entity_1.DocAttachmentsEntity, (doc) => doc.DocId),
    (0, typeorm_1.JoinColumn)({ name: 'DocId' }),
    __metadata("design:type", Number)
], ChaufDriveDocs.prototype, "DocId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChaufDriveDocs.prototype, "BookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ChaufDriveDocs.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChaufDriveDocs.prototype, "CreatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ChaufDriveDocs.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChaufDriveDocs.prototype, "ModifiedOn", void 0);
exports.ChaufDriveDocs = ChaufDriveDocs = __decorate([
    (0, typeorm_1.Entity)('ChaufDriveDocs')
], ChaufDriveDocs);
//# sourceMappingURL=chauffer-docs.entity.js.map