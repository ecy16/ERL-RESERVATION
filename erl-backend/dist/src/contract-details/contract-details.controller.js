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
exports.ContractDetailsController = void 0;
const common_1 = require("@nestjs/common");
const contract_details_service_1 = require("./contract-details.service");
const create_contract_detail_dto_1 = require("../dto/create-contract-detail.dto");
const update_contract_detail_dto_1 = require("../dto/update-contract-detail.dto");
let ContractDetailsController = class ContractDetailsController {
    constructor(contractDetailsService) {
        this.contractDetailsService = contractDetailsService;
    }
    addContractDetail(body) {
        return this.contractDetailsService.createContractDetails(body);
    }
    findAll() {
        return this.contractDetailsService.findAllContractsDetails();
    }
    getOneContractDetailsById(id) {
        return this.contractDetailsService.findOneContractsDetails(parseInt(id));
    }
    getCharges(id) {
        return this.contractDetailsService.getCurrency(parseInt(id));
    }
    getChargeType(id) {
        return this.contractDetailsService.getChargeType(parseInt(id));
    }
    findAllChargeTypes() {
        return this.contractDetailsService.findAllCharges();
    }
    findAllCharge() {
        return this.contractDetailsService.findCurr();
    }
    update(id, updateContractDetailDto) {
        return this.contractDetailsService.updateContractDetails(+id, updateContractDetailDto);
    }
    remove(id) {
        return this.contractDetailsService.remove(+id);
    }
    getRelatedContracts(id) {
        return this.contractDetailsService.findRelatedContractDetails(parseInt(id));
    }
};
exports.ContractDetailsController = ContractDetailsController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_detail_dto_1.CreateContractDetailDto]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "addContractDetail", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('related/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "getOneContractDetailsById", null);
__decorate([
    (0, common_1.Get)('curr/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "getCharges", null);
__decorate([
    (0, common_1.Get)('chargeType/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "getChargeType", null);
__decorate([
    (0, common_1.Get)('chargeType'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "findAllChargeTypes", null);
__decorate([
    (0, common_1.Get)('curr'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "findAllCharge", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contract_detail_dto_1.UpdateContractDetailDto]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('related/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractDetailsController.prototype, "getRelatedContracts", null);
exports.ContractDetailsController = ContractDetailsController = __decorate([
    (0, common_1.Controller)('contract-details'),
    __metadata("design:paramtypes", [contract_details_service_1.ContractDetailsService])
], ContractDetailsController);
//# sourceMappingURL=contract-details.controller.js.map