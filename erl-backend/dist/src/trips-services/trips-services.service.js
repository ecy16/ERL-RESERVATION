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
exports.TripsServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tripServices_entity_1 = require("../entities/tripServices.entity");
const typeorm_2 = require("typeorm");
let TripsServicesService = class TripsServicesService {
    constructor(tripservicesRepo, tripservicesEntity, tripServiceDataSource) {
        this.tripservicesRepo = tripservicesRepo;
        this.tripservicesEntity = tripservicesEntity;
        this.tripServiceDataSource = tripServiceDataSource;
    }
    async createTripService(addTripsServicesDto) {
        const tripServices = new tripServices_entity_1.TripServicesEntity(addTripsServicesDto);
        try {
            return await this.tripservicesEntity.save(tripServices);
        }
        catch (err) {
            throw new common_1.BadRequestException(`SOMETHING WENT WRONG: ${err.message}`);
        }
    }
    async findAllTripsServices() {
        try {
            return await this.tripservicesRepo.find();
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    findTripsService(id) {
        return this.tripservicesRepo.findOne({ where: { ServiceId: id } });
    }
    async updateTripService(id, attrs) {
        const services = await this.findTripsService(id);
        if (!services) {
            throw new common_1.NotFoundException('services not found');
        }
        Object.assign(services, attrs);
        return this.tripservicesRepo.save(services);
    }
    async findRelatedTripsService(reservationId) {
        const trip = this.tripServiceDataSource.createQueryRunner();
        await trip.connect();
        try {
            await trip.startTransaction();
            const tripInfo = await trip.query(`
              SELECT
    k.Description_1 AS serviceDesc,
    k.Code,
    m.TripNo
FROM
    _cplTripServices l
JOIN
    stkitem k ON l.serviceName = k.StockLink
JOIN
    _cplReservationTrips m ON l.TripId = m.TripId
WHERE
    l.reservationId = @0;

`, [reservationId]);
            await trip.commitTransaction();
            return tripInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
    async fetchServiceStatus() {
        const serviceStatus = await this.tripServiceDataSource.createQueryRunner();
        await serviceStatus.connect();
        try {
            await serviceStatus.startTransaction();
            const status = await serviceStatus.manager.query(`select  distinct category_Options from _cplItemMaster where item_Name=@0 and category_name=@1 `, ['TripServices', 'ServiceStatus']);
            await serviceStatus.commitTransaction();
            return status;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async fetchSageServices(reservationId) {
        const sageService = await this.tripServiceDataSource.createQueryRunner();
        await sageService.connect();
        try {
            await sageService.startTransaction();
            const service = await sageService.manager.query(`  select
            k.Description_1 as serviceDesc1,k.Description_2 as serviceDesc, k.Code, @0 from 
                 stkitem k join  _etblStockDetails std on k.stocklink=std.stockid and whseid=0 where std.groupid=10
             `, [reservationId]);
            await sageService.commitTransaction();
            return service;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async fetchSageServicesInfo(serviceName) {
        serviceName = serviceName.split('%20').join(' ');
        const sageRelatedService = await this.tripServiceDataSource.createQueryRunner();
        await sageRelatedService.connect();
        try {
            await sageRelatedService.startTransaction();
            const relatedService = await sageRelatedService.manager.query(`
                select a.StockLink,a.Code,a.Description_1,isnull(e.AverageCost,0)as AverageCost ,isnull(e.LatestCost,0) as LatestCost from StkItem a join _etblStockDetails b on a.StockLink=b.StockID
                join _etblStockCategories c on b.ItemCategoryID = c.idStockCategories
                         join GrpTbl d on b.GroupID= d.idGrpTbl
                          left join _etblStockCosts e on a.StockLink=e.StockID
                where c.cCategoryName=@0 and d.StGroup=@1  and a.StockLink=@2`, ['SelfDrivenServices', 'Reservations', serviceName]);
            await sageRelatedService.commitTransaction();
            return relatedService;
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async fetchTripServiceInfo(serviceId) {
        const tripService = this.tripServiceDataSource.createQueryRunner();
        await tripService.connect();
        try {
            await tripService.startTransaction();
            const tripServiceInfo = await tripService.query(`select  * from _cplTripServices where ServiceId=@0`, [serviceId]);
            await tripService.commitTransaction();
            return tripServiceInfo;
        }
        catch (e) {
            throw new Error(`Failed to find trips: ${e.message}`);
        }
    }
};
exports.TripsServicesService = TripsServicesService;
exports.TripsServicesService = TripsServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tripServices_entity_1.TripServicesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.DataSource])
], TripsServicesService);
//# sourceMappingURL=trips-services.service.js.map