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
exports.ChaufferDriversController = void 0;
const common_1 = require("@nestjs/common");
const chauffer_drivers_service_1 = require("./chauffer-drivers.service");
const update_chauffer_driver_dto_1 = require("./dto/update-chauffer-driver.dto");
const add_drivers_dto_1 = require("../dto/add-drivers.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
let ChaufferDriversController = class ChaufferDriversController {
    constructor(chaufferDriversService) {
        this.chaufferDriversService = chaufferDriversService;
    }
    getAllChauffers() {
        return this.chaufferDriversService.fetchAllChauffers();
    }
    addChaufferDriver(body) {
        return this.chaufferDriversService.addChauffer(body);
    }
    getDriver(DriverFirstName) {
        return this.chaufferDriversService.fetchChaufferById(DriverFirstName);
    }
    getChaufferDrivers(id) {
        return this.chaufferDriversService.getChaufferDrivers(parseInt(id));
    }
    findOne(id) {
        return this.chaufferDriversService.findOne(+id);
    }
    update(id, updateChaufferDriverDto) {
        return this.chaufferDriversService.update(+id, updateChaufferDriverDto);
    }
    remove(id) {
        return this.chaufferDriversService.remove(+id);
    }
    searchChauffer(Body) {
        return this.chaufferDriversService.searchView(Body);
    }
    async uploadChaufferDataFile(file) {
        return this.chaufferDriversService.uploadDrivers(file);
    }
};
exports.ChaufferDriversController = ChaufferDriversController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "getAllChauffers", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_drivers_dto_1.AddDriversDto]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "addChaufferDriver", null);
__decorate([
    (0, common_1.Get)('chauffers/:DriverFirstName'),
    __param(0, (0, common_1.Param)('DriverFirstName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "getDriver", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "getChaufferDrivers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chauffer_driver_dto_1.UpdateChaufferDriverDto]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('search/chauffer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChaufferDriversController.prototype, "searchChauffer", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(xls|xlsx)$/)) {
                return cb(new Error('Only Excel files are allowed!'), false);
            }
            cb(null, true);
        }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChaufferDriversController.prototype, "uploadChaufferDataFile", null);
exports.ChaufferDriversController = ChaufferDriversController = __decorate([
    (0, swagger_1.ApiTags)('chauffer-drivers'),
    (0, common_1.Controller)('chauffer-drivers'),
    __metadata("design:paramtypes", [chauffer_drivers_service_1.ChaufferDriversService])
], ChaufferDriversController);
//# sourceMappingURL=chauffer-drivers.controller.js.map