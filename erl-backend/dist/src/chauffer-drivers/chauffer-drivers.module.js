"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaufferDriversModule = void 0;
const common_1 = require("@nestjs/common");
const chauffer_drivers_service_1 = require("./chauffer-drivers.service");
const chauffer_drivers_controller_1 = require("./chauffer-drivers.controller");
const typeorm_1 = require("@nestjs/typeorm");
const chauffer_driver_entity_1 = require("../entities/chauffer-driver.entity");
let ChaufferDriversModule = class ChaufferDriversModule {
};
exports.ChaufferDriversModule = ChaufferDriversModule;
exports.ChaufferDriversModule = ChaufferDriversModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chauffer_driver_entity_1.ChaufferDriverEntity])],
        controllers: [chauffer_drivers_controller_1.ChaufferDriversController],
        providers: [chauffer_drivers_service_1.ChaufferDriversService],
    })
], ChaufferDriversModule);
//# sourceMappingURL=chauffer-drivers.module.js.map