"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsServicesModule = void 0;
const common_1 = require("@nestjs/common");
const trips_services_controller_1 = require("./trips-services.controller");
const trips_services_service_1 = require("./trips-services.service");
const typeorm_1 = require("@nestjs/typeorm");
const tripServices_entity_1 = require("../entities/tripServices.entity");
let TripsServicesModule = class TripsServicesModule {
};
exports.TripsServicesModule = TripsServicesModule;
exports.TripsServicesModule = TripsServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tripServices_entity_1.TripServicesEntity])],
        controllers: [trips_services_controller_1.TripsServicesController],
        providers: [trips_services_service_1.TripsServicesService],
    })
], TripsServicesModule);
//# sourceMappingURL=trips-services.module.js.map