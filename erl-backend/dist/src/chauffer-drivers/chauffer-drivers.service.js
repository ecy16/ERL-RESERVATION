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
exports.ChaufferDriversService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const chauffer_driver_entity_1 = require("../entities/chauffer-driver.entity");
const rxjs_1 = require("rxjs");
let ChaufferDriversService = class ChaufferDriversService {
    constructor(chaufferRepo, chaufferDriversDataSource) {
        this.chaufferRepo = chaufferRepo;
        this.chaufferDriversDataSource = chaufferDriversDataSource;
    }
    async fetchAllChauffers() {
        return await this.chaufferRepo.find();
    }
    create(createChaufferDriverDto) {
        return 'This action adds a new chaufferDriver';
    }
    async getChaufferDrivers(id) {
        const chaufferDrivers = this.chaufferDriversDataSource.createQueryRunner();
        await chaufferDrivers.connect();
        try {
            await chaufferDrivers.startTransaction();
            const chaufferDriversInfo = await chaufferDrivers.query(`select  *from _cplChaufferDrivers where DriverFirstName=@Adam`);
            await chaufferDrivers.commitTransaction();
            return chaufferDriversInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async addChauffer(addDriversDto) {
        const Chauffer = new chauffer_driver_entity_1.ChaufferDriverEntity(addDriversDto);
        try {
            return await this.chaufferRepo.save(Chauffer);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async fetchChaufferById(DriverFirstName) {
        const chauffer = this.chaufferDriversDataSource.createQueryRunner();
        await chauffer.connect();
        try {
            await chauffer.startTransaction();
            const chaufferInfo = await chauffer.query(`select  *from _cplChaufferDrivers where DriverFirstName=@0`, [DriverFirstName]);
            await chauffer.commitTransaction();
            return chaufferInfo;
        }
        catch (m) {
            throw new Error(`Failed to find Chauffers:${m.message}`);
        }
    }
    searchView(searchDriversDto) {
        const query = this.chaufferRepo.createQueryBuilder('chauffers');
        const { ...otherParams } = searchDriversDto;
        Object.keys(otherParams).forEach(key => {
            const value = otherParams[key];
            if (value) {
                query.andWhere(`chauffers.${key} = :${key}`, { [key]: value });
            }
        });
        return (0, rxjs_1.from)(query.getMany());
    }
    findOne(id) {
        return `This action returns a #${id} chaufferDriver`;
    }
    update(id, updateChaufferDriverDto) {
        return `This action updates a #${id} chaufferDriver`;
    }
    remove(id) {
        return `This action removes a #${id} chaufferDriver`;
    }
    ;
};
exports.ChaufferDriversService = ChaufferDriversService;
exports.ChaufferDriversService = ChaufferDriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(chauffer_driver_entity_1.ChaufferDriverEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], ChaufferDriversService);
//# sourceMappingURL=chauffer-drivers.service.js.map