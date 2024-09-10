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
exports.ReservationDetailsViewEntity = void 0;
const typeorm_1 = require("typeorm");
let ReservationDetailsViewEntity = class ReservationDetailsViewEntity {
};
exports.ReservationDetailsViewEntity = ReservationDetailsViewEntity;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ReservationDetailsViewEntity.prototype, "ReservationId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "DriverName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "BookingFor", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ReservationDetailsViewEntity.prototype, "ContractId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "BookingCategory", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "BookingNo", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "FlightDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "FromDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "ToDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "FromTime", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "ToTime", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ReservationDetailsViewEntity.prototype, "Branch", void 0);
exports.ReservationDetailsViewEntity = ReservationDetailsViewEntity = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: `
        SELECT 

            a.*, 
            d.DriverFirstName + ' ' + d.DriverLastName AS DriverName,
            b.BookingFor,
            e.ContractId,
            d.email,
            CASE 
                WHEN b.companyName = ' ' THEN e.companyName 
                ELSE b.companyName 
            END AS companyName,
            b.BookingCategory,
            b.BookingNo,
            FORMAT(CONVERT(DATE, '2024-09-10', 120), 'dd-MM-yyyy HH:mm') AS FlightDate,
            FORMAT(FromDateTime, 'dd-MM-yyyy') AS FromDate,
            FORMAT(ToDateTime, 'dd-MM-yyyy') AS ToDate,
            FORMAT(FromDateTime, 'HH:mm:ss') AS FromTime,
            FORMAT(ToDateTime, 'HH:mm:ss') AS ToTime
        FROM _cplReservationTrips a 
        JOIN _cplReservations b ON a.ReservationId = b.ReservationId
        LEFT JOIN _cplVehicles c ON a.VehicleId = c.vehicleID
        LEFT JOIN _cplChaufferDrivers d ON a.DriverId = d.DriverId
        LEFT JOIN _cplContracts e ON b.ContractId = e.ContractId
    `,
    })
], ReservationDetailsViewEntity);
//# sourceMappingURL=View.entity.js.map