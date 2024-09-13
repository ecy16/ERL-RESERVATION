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
exports.VehicleMasterController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_master_service_1 = require("./vehicle-master.service");
let VehicleMasterController = class VehicleMasterController {
    constructor(vehicleMasterService) {
        this.vehicleMasterService = vehicleMasterService;
    }
    fetchAllVehicleMakes() {
        return this.vehicleMasterService.fetchVehicleMakeAll();
    }
    fetchVehicleModels(Make) {
        return this.vehicleMasterService.fetchVehicleModel(Make);
    }
    fetchVehicleType(Model) {
        return this.vehicleMasterService.fetchVehicleType(Model);
    }
};
exports.VehicleMasterController = VehicleMasterController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleMasterController.prototype, "fetchAllVehicleMakes", null);
__decorate([
    (0, common_1.Get)('/:Make'),
    __param(0, (0, common_1.Param)('Make')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleMasterController.prototype, "fetchVehicleModels", null);
__decorate([
    (0, common_1.Get)('Types/:Model'),
    __param(0, (0, common_1.Param)('Model')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleMasterController.prototype, "fetchVehicleType", null);
exports.VehicleMasterController = VehicleMasterController = __decorate([
    (0, common_1.Controller)('vehicle-master'),
    __metadata("design:paramtypes", [vehicle_master_service_1.VehicleMasterService])
], VehicleMasterController);
//# sourceMappingURL=vehicle-master.controller.js.map