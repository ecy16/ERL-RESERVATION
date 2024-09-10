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
exports.ReservationDocsEntity = void 0;
const typeorm_1 = require("typeorm");
const docAttachments_entity_1 = require("./docAttachments.entity");
const selfDrivers_entity_1 = require("./selfDrivers.entity");
let ReservationDocsEntity = class ReservationDocsEntity {
};
exports.ReservationDocsEntity = ReservationDocsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservationDocsEntity.prototype, "ReservationDocId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => docAttachments_entity_1.DocAttachmentsEntity),
    (0, typeorm_1.JoinColumn)({ name: 'DocId' }),
    __metadata("design:type", docAttachments_entity_1.DocAttachmentsEntity)
], ReservationDocsEntity.prototype, "doc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => selfDrivers_entity_1.SelfDriversEntity),
    (0, typeorm_1.JoinColumn)({ name: 'BookingId' }),
    __metadata("design:type", selfDrivers_entity_1.SelfDriversEntity)
], ReservationDocsEntity.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], ReservationDocsEntity.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ReservationDocsEntity.prototype, "CreatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], ReservationDocsEntity.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ReservationDocsEntity.prototype, "ModifiedOn", void 0);
exports.ReservationDocsEntity = ReservationDocsEntity = __decorate([
    (0, typeorm_1.Entity)('_cplReservationDocs')
], ReservationDocsEntity);
//# sourceMappingURL=reservation-doc.entity.js.map