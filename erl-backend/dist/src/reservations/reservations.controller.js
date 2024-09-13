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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const add_reservation_dto_1 = require("../dto/add-reservation.dto");
const update_reservation_dto_1 = require("../dto/update-reservation.dto");
let ReservationsController = class ReservationsController {
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    fetchReservation(id) {
        return this.reservationsService.findReservationsById(parseInt(id));
    }
    fetchOneReservation(id) {
        return this.reservationsService.findReservations(parseInt(id));
    }
    fetchAllReservation() {
        return this.reservationsService.findAllReservations();
    }
    addNewReservation(body) {
        return this.reservationsService.createReservation(body);
    }
    updateReservation(id, body) {
        return this.reservationsService.updateReservation(parseInt(id), body);
    }
    fetchCategories() {
        return this.reservationsService.findBookingCategory();
    }
    fetchBookingTypes() {
        return this.reservationsService.findBookingType();
    }
    fetchBranch() {
        return this.reservationsService.findBookingBranch();
    }
    fetchBookingStatus() {
        return this.reservationsService.findBookingStatus();
    }
    fetchBookingSource() {
        return this.reservationsService.findBookingSource();
    }
    fetchChargeType() {
        return this.reservationsService.findBookingChargeType();
    }
    fetchBranchNo(Branch) {
        return this.reservationsService.fetchBookingRules(Branch);
    }
    searchValue(Body) {
        return this.reservationsService.searchView(Body);
    }
    searchResourcesValue(Body) {
        return this.reservationsService.searchResources(Body);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchReservation", null);
__decorate([
    (0, common_1.Get)('/details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchOneReservation", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchAllReservation", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_reservation_dto_1.AddReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "addNewReservation", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reservation_dto_1.UpdateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "updateReservation", null);
__decorate([
    (0, common_1.Post)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchCategories", null);
__decorate([
    (0, common_1.Post)('type'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchBookingTypes", null);
__decorate([
    (0, common_1.Post)('branch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchBranch", null);
__decorate([
    (0, common_1.Post)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchBookingStatus", null);
__decorate([
    (0, common_1.Post)('source'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchBookingSource", null);
__decorate([
    (0, common_1.Post)('charge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchChargeType", null);
__decorate([
    (0, common_1.Post)('LastNo/:Branch'),
    __param(0, (0, common_1.Param)('Branch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "fetchBranchNo", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "searchValue", null);
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "searchResourcesValue", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map