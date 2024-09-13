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
exports.SelfDriversService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const selfDrivers_entity_1 = require("../entities/selfDrivers.entity");
let SelfDriversService = class SelfDriversService {
    constructor(selfDriversRepo, selfDriversEntity, selfDriversDataSource) {
        this.selfDriversRepo = selfDriversRepo;
        this.selfDriversEntity = selfDriversEntity;
        this.selfDriversDataSource = selfDriversDataSource;
    }
    async createSelfDriver(addSelfDriversDto) {
        const selfDriver = new selfDrivers_entity_1.SelfDriversEntity(addSelfDriversDto);
        try {
            return await this.selfDriversEntity.save(selfDriver);
        }
        catch (err) {
            throw new Error(`Failed something happened: ${err.message}`);
        }
    }
    async findAllSelfDrivers() {
        try {
            return await this.selfDriversRepo.find();
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(err);
        }
    }
    findRelatedSelfDrivers(id) {
        return this.selfDriversRepo.find({ where: { ReservationId: id } });
    }
    findSelfDriver(id) {
        return this.selfDriversRepo.findOne({ where: { BookingDriverId: id } });
    }
    async updateSelfDriver(id, attrs) {
        try {
            const selfDriver = await this.findSelfDriver(id);
            if (!selfDriver) {
                throw new common_1.NotFoundException('Driver not found');
            }
            Object.assign(selfDriver, attrs);
            return this.selfDriversRepo.save(selfDriver);
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async uploadFile(file) {
        const filePath = `uploads/${file.filename}`;
        return filePath;
    }
};
exports.SelfDriversService = SelfDriversService;
exports.SelfDriversService = SelfDriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(selfDrivers_entity_1.SelfDriversEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], SelfDriversService);
//# sourceMappingURL=self-drivers.service.js.map