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
exports.SelfDriversController = void 0;
const common_1 = require("@nestjs/common");
const self_drivers_service_1 = require("./self-drivers.service");
const add_selfDrivers_dto_1 = require("../dto/add-selfDrivers.dto");
const update_selfDrivers_dto_1 = require("../dto/update-selfDrivers.dto");
let SelfDriversController = class SelfDriversController {
    constructor(selfDriversService) {
        this.selfDriversService = selfDriversService;
    }
    fetchSelfDriver(id) {
        return this.selfDriversService.findSelfDriver(parseInt(id));
    }
    fetchRelatedSelfDriver(id) {
        return this.selfDriversService.findRelatedSelfDrivers(parseInt(id));
    }
    fetchAllSelfDrivers() {
        return this.selfDriversService.findAllSelfDrivers();
    }
    addNewSelfDriver(body) {
        return this.selfDriversService.createSelfDriver(body);
    }
    updateSelfDriver(id, body) {
        return this.selfDriversService.updateSelfDriver(parseInt(id), body);
    }
};
exports.SelfDriversController = SelfDriversController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SelfDriversController.prototype, "fetchSelfDriver", null);
__decorate([
    (0, common_1.Get)('related/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SelfDriversController.prototype, "fetchRelatedSelfDriver", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SelfDriversController.prototype, "fetchAllSelfDrivers", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_selfDrivers_dto_1.AddSelfDriversDto]),
    __metadata("design:returntype", void 0)
], SelfDriversController.prototype, "addNewSelfDriver", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_selfDrivers_dto_1.UpdateSelfDriversDto]),
    __metadata("design:returntype", void 0)
], SelfDriversController.prototype, "updateSelfDriver", null);
exports.SelfDriversController = SelfDriversController = __decorate([
    (0, common_1.Controller)('self-drivers'),
    __metadata("design:paramtypes", [self_drivers_service_1.SelfDriversService])
], SelfDriversController);
//# sourceMappingURL=self-drivers.controller.js.map