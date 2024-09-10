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
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const vehicles_service_1 = require("./vehicles.service");
const add_vehicle_dto_1 = require("../dto/add-vehicle.dto");
const update_vehicle_dto_1 = require("../dto/update-vehicle.dto");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const moment = require("moment");
let VehiclesController = class VehiclesController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    getAllVehicles() {
        return this.vehicleService.fetchAllVehicles();
    }
    addNewVehicle(body) {
        return this.vehicleService.addVehicle(body);
    }
    findVehicle(id) {
        return this.vehicleService.findOne(parseInt(id));
    }
    getVehicle(vehicleModel) {
        return this.vehicleService.fetchVehicleByModel(vehicleModel);
    }
    updateVehicle(id, body) {
        return this.vehicleService.updateVehicle(parseInt(id), body);
    }
    async uploadFile(file) {
        return file;
    }
    searchValue(Body) {
        return this.vehicleService.searchVehicles(Body);
    }
    uploadCsv(file) {
        this.vehicleService.importVehicles(file);
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "getAllVehicles", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_vehicle_dto_1.AddVehicleDto]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "addNewVehicle", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "findVehicle", null);
__decorate([
    (0, common_1.Get)('vehicle/:vehicleModel'),
    __param(0, (0, common_1.Param)('vehicleModel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "getVehicle", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_dto_1.UpdateVehicleDto]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "updateVehicle", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "searchValue", null);
__decorate([
    (0, common_1.Post)('/uploadBatch'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("csv", {
        storage: (0, multer_1.diskStorage)({
            destination: './csv',
            filename: (req, file, cb) => {
                const randomName = 'Vehicle_Importation_File' + moment()
                    .format("DDMMYYYY_HHmmss");
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "uploadCsv", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map