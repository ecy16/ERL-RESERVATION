"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const contract_details_service_1 = require("./contract-details.service");
const contract_details_controller_1 = require("./contract-details.controller");
const typeorm_1 = require("@nestjs/typeorm");
const contract_detail_entity_1 = require("../entities/contract-detail.entity");
let ContractDetailsModule = class ContractDetailsModule {
};
exports.ContractDetailsModule = ContractDetailsModule;
exports.ContractDetailsModule = ContractDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contract_detail_entity_1.ContractDetailEntity])],
        controllers: [contract_details_controller_1.ContractDetailsController],
        providers: [contract_details_service_1.ContractDetailsService],
    })
], ContractDetailsModule);
//# sourceMappingURL=contract-details.module.js.map