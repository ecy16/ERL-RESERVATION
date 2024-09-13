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
exports.TripIncidentsEntity = void 0;
const typeorm_1 = require("typeorm");
let TripIncidentsEntity = class TripIncidentsEntity {
    constructor(incidents) {
        Object.assign(this, incidents);
    }
};
exports.TripIncidentsEntity = TripIncidentsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TripIncidentsEntity.prototype, "TripIncidentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TripIncidentsEntity.prototype, "TripId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TripIncidentsEntity.prototype, "ReservationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "IncidentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "IncidentRemarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "ReportedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "DriverName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "IncidentDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "Disposition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "CreatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TripIncidentsEntity.prototype, "ModifiedOn", void 0);
exports.TripIncidentsEntity = TripIncidentsEntity = __decorate([
    (0, typeorm_1.Entity)('_cplTripIncidents'),
    __metadata("design:paramtypes", [Object])
], TripIncidentsEntity);
//# sourceMappingURL=tripIncidents.entity.js.map