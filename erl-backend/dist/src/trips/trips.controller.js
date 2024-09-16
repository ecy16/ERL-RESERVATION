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
exports.TripsController = void 0;
const common_1 = require("@nestjs/common");
const trips_service_1 = require("./trips.service");
const add_trip_dto_1 = require("../dto/add-trip.dto");
const update_trip_dto_1 = require("../dto/update-trip.dto");
const vehicleValidation_dto_1 = require("../dto/vehicleValidation.dto");
const driverValidation_dto_1 = require("../dto/driverValidation.dto");
const vehicleMovement_dto_1 = require("../dto/vehicleMovement.dto");
let TripsController = class TripsController {
    constructor(tripService) {
        this.tripService = tripService;
    }
    fetchTrips(id) {
        return this.tripService.findTrips((id));
    }
    getOneTrip(id) {
        return this.tripService.findTrips1((id));
    }
    getAllTrips() {
        return this.tripService.findAllTrips();
    }
    fetchFuelLevel() {
        return this.tripService.fetchFuelLevel();
    }
    fetchDriverServiceStatus() {
        return this.tripService.driverService();
    }
    fetchTripStatus() {
        return this.tripService.tripStatus();
    }
    addNewTrip(body) {
        return this.tripService.createTrip(body);
    }
    updateTripById(id, body) {
        return this.tripService.updateTrip(parseInt(id), body);
    }
    fetchRelatedTrips(reservationId) {
        return this.tripService.findRelatedTrips(parseInt(reservationId));
    }
    findAssignmentTrips(id) {
        return this.tripService.findRelatedTrips(parseInt(id));
    }
    fetchSortedTrips() {
        return this.tripService.fetchSortedTrips();
    }
    addVehicleMovement(TripId, body) {
        return this.tripService.addVehicleMovement(parseInt(TripId), body);
    }
    fetchDeliverTrips(TripId) {
        return this.tripService.fetchDeliverTrips(parseInt(TripId));
        ;
    }
    fetchAllTrips() {
        return this.tripService.findAllTrips();
    }
    fetchLastRelatedTrips(reservationId) {
        return this.tripService.findLastRelatedTrips(parseInt(reservationId));
    }
    getRelatedReservationTrip(reservationId) {
        return this.tripService.findRelatedReservationTrips(parseInt(reservationId));
    }
    assignVehicle(model) {
        return this.tripService.assignVehicle(model);
    }
    validateVehicle(body) {
        console.log(body);
        return this.tripService.assignReg(body);
    }
    validateDriver(body) {
        return this.tripService.assignDriver(body);
    }
    searchResourcesValue(Body) {
        return this.tripService.searchResources(Body);
    }
};
exports.TripsController = TripsController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchTrips", null);
__decorate([
    (0, common_1.Get)('ById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "getOneTrip", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "getAllTrips", null);
__decorate([
    (0, common_1.Post)('fuelLevel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchFuelLevel", null);
__decorate([
    (0, common_1.Post)('driverService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchDriverServiceStatus", null);
__decorate([
    (0, common_1.Post)('tripStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchTripStatus", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_trip_dto_1.AddTripDto]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "addNewTrip", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trip_dto_1.UpdateTripDto]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "updateTripById", null);
__decorate([
    (0, common_1.Get)('trip/:TripId'),
    __param(0, (0, common_1.Param)('TripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchRelatedTrips", null);
__decorate([
    (0, common_1.Get)('Asstrip/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "findAssignmentTrips", null);
__decorate([
    (0, common_1.Post)('/sorted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchSortedTrips", null);
__decorate([
    (0, common_1.Post)('/vehicleMovements/:TripId'),
    __param(0, (0, common_1.Param)('TripId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vehicleMovement_dto_1.VehicleMovementDto]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "addVehicleMovement", null);
__decorate([
    (0, common_1.Get)('delivered/:TripId'),
    __param(0, (0, common_1.Param)('TripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchDeliverTrips", null);
__decorate([
    (0, common_1.Post)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchAllTrips", null);
__decorate([
    (0, common_1.Get)('tripLast/:reservationId'),
    __param(0, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "fetchLastRelatedTrips", null);
__decorate([
    (0, common_1.Get)('findTrip/:reservationId'),
    __param(0, (0, common_1.Param)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "getRelatedReservationTrip", null);
__decorate([
    (0, common_1.Get)('assign-car/:model'),
    __param(0, (0, common_1.Param)('model')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "assignVehicle", null);
__decorate([
    (0, common_1.Post)('/validateVehicle'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vehicleValidation_dto_1.VehicleValidationDto]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "validateVehicle", null);
__decorate([
    (0, common_1.Post)('/validateDriver'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driverValidation_dto_1.DriverValidationDto]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "validateDriver", null);
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TripsController.prototype, "searchResourcesValue", null);
exports.TripsController = TripsController = __decorate([
    (0, common_1.Controller)('trips'),
    __metadata("design:paramtypes", [trips_service_1.TripsService])
], TripsController);
//# sourceMappingURL=trips.controller.js.map