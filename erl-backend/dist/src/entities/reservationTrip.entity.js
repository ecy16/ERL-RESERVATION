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
exports.ReservationTripEntity = void 0;
const typeorm_1 = require("typeorm");
let ReservationTripEntity = class ReservationTripEntity {
    constructor(trips) {
        Object.assign(this, trips);
    }
};
exports.ReservationTripEntity = ReservationTripEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "TripId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "tripNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "ReservationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "DriverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "DriverFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "DriverServiceStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "DriverRemarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "TripStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "VehicleRemarks", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "FromDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "ToDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "ArrivalFlightNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "DepartureFlightNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "ArrivalFlightDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "DepartureFlightDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "Airline", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "PickupAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "PickupContactNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "PickupEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "DropAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "RouteCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "ReqVehicleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "VehicleMake", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "VehicleModel", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "MileageCap", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "MileageIN", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "MileageOUT", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "FuelIN", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "FuelOUT", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "CheckOUTBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "CheckINBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "CreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "CreatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "ModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "ModifiedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "PickupFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "PickupLastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "Remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationTripEntity.prototype, "vehicleID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "vehicleRegNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationTripEntity.prototype, "Transaction", void 0);
exports.ReservationTripEntity = ReservationTripEntity = __decorate([
    (0, typeorm_1.Entity)('_cplReservationTrips'),
    __metadata("design:paramtypes", [Object])
], ReservationTripEntity);
//# sourceMappingURL=reservationTrip.entity.js.map