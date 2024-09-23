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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehicle_entity_1 = require("../entities/vehicle.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
let VehiclesService = class VehiclesService {
    constructor(vehicleRepo, vehicleDataSource) {
        this.vehicleRepo = vehicleRepo;
        this.vehicleDataSource = vehicleDataSource;
    }
    async fetchAllVehicles() {
        return await this.vehicleRepo.find();
    }
    async addVehicle(addVehicleDto, files) {
        const vehicle = new vehicle_entity_1.VehiclesEntity({
            ...addVehicleDto,
            image: files?.image && files.image.length > 0 ? `${process.env.BASE_URL}/uploads/${files.image[0].filename}` : null,
            document: files?.document && files.document.length > 0 ? `${process.env.BASE_URL}/uploads/${files.document[0].filename}` : null,
        });
        try {
            return await this.vehicleRepo.save(vehicle);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    findOne(id) {
        return this.vehicleRepo.findOne({ where: { vehicleID: id } });
    }
    async fetchVehicleByModel(vehicleModel) {
        const vehicle = this.vehicleDataSource.createQueryRunner();
        await vehicle.connect();
        try {
            await vehicle.startTransaction();
            const vehicleInfo = await vehicle.query(`select  *from  _cplItemMaster m  
                where m.category_Name ='Make'`);
            await vehicle.commitTransaction();
            return vehicleInfo;
        }
        catch (e) {
            throw new Error(`Failed to find vehicles: ${e.message}`);
        }
    }
    async updateVehicle(id, attrs) {
        const vehicle = await this.findOne(id);
        if (!vehicle) {
            throw new common_1.NotFoundException('vehicle not found');
        }
        Object.assign(vehicle, attrs);
        return this.vehicleRepo.save(vehicle);
    }
    searchVehicles(searchVehicleDto) {
        const query = this.vehicleRepo.createQueryBuilder('vehicle');
        Object.keys(searchVehicleDto).forEach(key => {
            const value = searchVehicleDto[key];
            if (value) {
                query.andWhere(`vehicle.${key} = :${key}`, { [key]: value });
            }
        });
        return (0, rxjs_1.from)(query.getMany()).pipe((0, rxjs_1.catchError)(error => {
            throw new Error(`Failed to find any results: ${error.message}`);
        }));
    }
    async importVehicles(file) {
        const batchSize = 500;
        const maxParameters = 2100;
        const maxColumns = 20;
        const calculatedBatchSize = Math.floor(maxParameters / maxColumns);
        const finalBatchSize = Math.min(batchSize, calculatedBatchSize);
        var message;
        var vehicleArray;
        try {
            console.log('Parsed Vehicle Array:', vehicleArray);
            var totalVehicles = vehicleArray.length;
        }
        catch (error) {
            throw new Error('Failed to read CSV file');
        }
        var savedVehicles;
        for (let i = 0; i < totalVehicles; i += finalBatchSize) {
            const batch = vehicleArray.slice(i, i + finalBatchSize);
            try {
                savedVehicles = await this.vehicleRepo.save(batch);
                message = 'Vehicles saved successfully';
            }
            catch (error) {
                savedVehicles = null;
                message = error;
            }
            return savedVehicles;
        }
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.VehiclesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map