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
exports.TripsServicesController = void 0;
const common_1 = require("@nestjs/common");
const trips_services_service_1 = require("./trips-services.service");
const add_tripServices_dto_1 = require("../dto/add-tripServices.dto");
const update_tripServices_dto_1 = require("../dto/update-tripServices.dto");
let TripsServicesController = class TripsServicesController {
    constructor(tripservicesService) {
        this.tripservicesService = tripservicesService;
    }
    fetchService(id) {
        return this.tripservicesService.findTripsService(parseInt(id));
    }
    fetchAllServices() {
        return this.tripservicesService.findAllTripsServices();
    }
    addNewService(body) {
        return this.tripservicesService.createTripService(body);
    }
    updateService(id, body) {
        return this.tripservicesService.updateTripService(parseInt(id), body);
    }
    fetchServiceStatus() {
        return this.tripservicesService.fetchServiceStatus();
    }
    fetchSageServices(reservationId) {
        return this.tripservicesService.fetchSageServices(reservationId);
    }
    getRelatedSageServices(serviceName) {
        return this.tripservicesService.fetchSageServicesInfo(serviceName);
    }
    getRelatedTripServiceInfo(serviceId) {
        return this.tripservicesService.fetchTripServiceInfo(parseInt(serviceId));
    }
};
exports.TripsServicesController = TripsServicesController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "fetchService", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "fetchAllServices", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_tripServices_dto_1.AddTripServicesDto]),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "addNewService", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tripServices_dto_1.UpdateTripServicesDto]),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "updateService", null);
__decorate([
    (0, common_1.Post)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "fetchServiceStatus", null);
__decorate([
    (0, common_1.Post)('sage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "fetchSageServices", null);
__decorate([
    (0, common_1.Get)('sage/:serviceName'),
    __param(0, (0, common_1.Param)('serviceName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "getRelatedSageServices", null);
__decorate([
    (0, common_1.Get)('serviceInfo/:serviceId'),
    __param(0, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TripsServicesController.prototype, "getRelatedTripServiceInfo", null);
exports.TripsServicesController = TripsServicesController = __decorate([
    (0, common_1.Controller)('trips-services'),
    __metadata("design:paramtypes", [trips_services_service_1.TripsServicesService])
], TripsServicesController);
//# sourceMappingURL=trips-services.controller.js.map