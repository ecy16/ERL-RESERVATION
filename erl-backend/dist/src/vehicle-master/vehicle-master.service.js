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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleMasterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let VehicleMasterService = class VehicleMasterService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async fetchVehicleMake() {
        const fetchMake = await this.dataSource.createQueryRunner();
        await fetchMake.connect();
        try {
            await fetchMake.startTransaction();
            const vehicleMakes = await fetchMake.query(`select distinct category_Options from _cplItemMaster where item_Name=@0 and category_Name=@1`, ['Vehicle', 'Make']);
            await fetchMake.commitTransaction();
            return vehicleMakes;
        }
        catch (e) {
            throw new Error(`Failed to fetch vehicle makes: ${e.message}`);
        }
    }
    async fetchVehicleMakeAll() {
        const fetchMake = await this.dataSource.createQueryRunner();
        await fetchMake.connect();
        try {
            await fetchMake.startTransaction();
            const vehicleMakes = await fetchMake.query(`select distinct category_Options from _cplItemMaster where category_Name='Make'`);
            await fetchMake.commitTransaction();
            return vehicleMakes;
        }
        catch (e) {
            throw new Error(`Failed to fetch vehicle makes: ${e.message}`);
        }
    }
    async fetchVehicleModel(Make) {
        const fetchModel = await this.dataSource.createQueryRunner();
        await fetchModel.connect();
        try {
            await fetchModel.startTransaction();
            const vehicleModel = await fetchModel.query(`select category_Options_1 from _cplItemMaster where item_Name=@0 and category_Name=@1 and category_Options=@2`, ['Vehicle', 'Make', Make]);
            await fetchModel.commitTransaction();
            return vehicleModel;
        }
        catch (e) {
            throw new Error(`Failed to fetch models for make: ${e.message}`);
        }
    }
    async fetchVehicleType(Model) {
        const fetchType = await this.dataSource.createQueryRunner();
        await fetchType.connect();
        try {
            await fetchType.startTransaction();
            const VehicleType = await fetchType.query(`select category_Options_2 from _cplItemMaster where item_Name='Vehicle' and category_Options_1=@0`, [Model]);
            await fetchType.commitTransaction();
            return VehicleType;
        }
        catch (e) {
            throw new Error(`Failed to fetch vehicle type: ${e.message}`);
        }
    }
};
exports.VehicleMasterService = VehicleMasterService;
exports.VehicleMasterService = VehicleMasterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], VehicleMasterService);
//# sourceMappingURL=vehicle-master.service.js.map