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
exports.ReservationEntity = void 0;
const typeorm_1 = require("typeorm");
let ReservationEntity = class ReservationEntity {
    constructor(reservations) {
        Object.assign(this, reservations);
    }
};
exports.ReservationEntity = ReservationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "ReservationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "BookingNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationEntity.prototype, "BookingDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationEntity.prototype, "BookingCategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationEntity.prototype, "BookingType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationEntity.prototype, "Branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'InProgress' }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "BookingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "BookingFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "CompanyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "PayeeCompanyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "Remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "ChargeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "ChargeCurr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "Source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "SourceRefNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "ContractId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'Admin' }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true, default: () => 'GETDATE()' }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "CreatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "ModifiedOn", void 0);
exports.ReservationEntity = ReservationEntity = __decorate([
    (0, typeorm_1.Entity)('_cplReservations'),
    __metadata("design:paramtypes", [Object])
], ReservationEntity);
//# sourceMappingURL=reservation.entity.js.map